import { ctOpts, prOpts, stOpts } from '@/constants';
import { ITask } from '@/services/create-task';
import { getTaskById } from '@/services/get-tasks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Flex, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { IModal } from './NewTaskModal';
import { updateTask } from '@/services/update-task';

interface ITaskModal extends IModal {
    id: number;
}

const TaskModal: React.FC<ITaskModal> = ({ id, open, onClose }) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = useForm()
    const qc = useQueryClient()

    const { data, isLoading } = useQuery<ITask>({
        queryKey: ['list-task-id', id],
        queryFn: () => getTaskById(id),
    })

    const { mutate } = useMutation({
        mutationFn: (body: Object) => updateTask(id, body),
        onSuccess: () => {
            messageApi.success('Tarefa atualizada com sucesso!');
            qc.invalidateQueries({ queryKey: ['list-tasks'] })
        },
        onError: (error) => console.log(error)
    })

    const handleSave = () => {
        form.validateFields().then(res => {
            const body = {
                ...res,
                estimated_date: dayjs(res.estimated_date).format('DD/MM/YYYY')
            }
            mutate(body)
        })
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name,
                description: data.description,
                priority: data.priority,
                category: data.category,
                status: data.status,
                estimated_date: dayjs(data.estimated_date),
            });
        }
    }, [data, form]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={`${data?.name} - criada em ${dayjs(data?.created_at).format('DD/MM/YYYY')}`}
            centered
            okText="Salvar"
            onOk={() => handleSave()}
        >
            {contextHolder}
            {isLoading || !data ? (
                <>aaa</>
            ) : (
                <Flex vertical style={{ marginTop: 24 }}>
                    <Form layout='vertical' form={form}>
                        <Form.Item label='Título' name={'name'} initialValue={data.name}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Descrição' name={'description'} initialValue={data.description}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item label='Prioridade' name={"priority"} initialValue={data.priority}>
                            <Select options={prOpts} />
                        </Form.Item>
                        <Form.Item label='Categoria' name={"category"} initialValue={data.category}>
                            <Select options={ctOpts} />
                        </Form.Item>
                        <Form.Item label='Status' name={"status"} initialValue={data.status}>
                            <Select options={stOpts} />
                        </Form.Item>
                        <Form.Item label='Data estimada' name={"estimated_date"} initialValue={dayjs(data.estimated_date)}>
                            <DatePicker format={'DD/MM/YYYY'} className='w-full' allowClear={false} />
                        </Form.Item>
                    </Form>
                </Flex>
            )}
        </Modal>
    )
}

export default TaskModal
