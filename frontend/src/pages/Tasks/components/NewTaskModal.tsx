import { ctOpts, prOpts, stOpts } from '@/constants';
import { createTask, ITask } from '@/services/create-task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React from 'react';

export interface IModal {
    open: boolean;
    onClose: () => void;
}

interface INewTask extends IModal {
    onCreate: () => void;
}

const NewTaskModal: React.FC<INewTask> = ({ open, onClose, onCreate }) => {
    const [form] = useForm()
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: (newTask: ITask) => createTask(newTask)
    })

    const handleCreate = () => {
        form.validateFields().then(async (values: ITask) => {
            const newTask: ITask = {
                ...values,
                estimated_date: dayjs(values.estimated_date).format('YYYY-MM-DD')
            }
            mutate(newTask, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['list-tasks'] });
                    onCreate();
                    form.resetFields();
                },
                onError: (error) => {
                    console.error('Error creating task:', error);
                }
            });
        })
    }

    return (
        <Modal
            title="Nova tarefa"
            open={open}
            onCancel={onClose}
            onOk={handleCreate}
            loading={isPending}
            destroyOnClose
            centered
        >
            <Form name="task" layout='vertical' form={form}>
                <Form.Item
                    label="Título"
                    name='name'
                    rules={[
                        { required: true, message: "O título da tarefa deve ser inserido" }
                    ]}
                    style={{ marginTop: '24px' }}
                >
                    <Input
                        placeholder='Digite o título da tarefa'
                    />
                </Form.Item>
                <Form.Item label="Descrição" name='description'>
                    <TextArea
                        placeholder='Digite a descrição da tarefa'
                    />
                </Form.Item>
                <Form.Item label="Prioridade" name='priority'>
                    <Select
                        placeholder='Selecione a prioridade da tarefa'
                        options={prOpts}
                        allowClear
                    />
                </Form.Item>
                <Form.Item label="Categoria" name='category'>
                    <Select
                        placeholder='Selecione a categoria da tarefa'
                        options={ctOpts}
                        allowClear
                    />
                </Form.Item>
                <Form.Item label="Status" name='status'>
                    <Select
                        placeholder='Selecione o status da tarefa'
                        options={stOpts}
                        allowClear
                    />
                </Form.Item>
                <Form.Item label='Data estimada para conclusão' name='estimated_date'>
                    <DatePicker
                        defaultValue={dayjs()}
                        allowClear={false}
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewTaskModal
