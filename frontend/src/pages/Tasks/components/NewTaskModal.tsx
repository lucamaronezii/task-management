import ObgSpan from '@/components/Obty';
import { ctOpts, prOpts, stOpts } from '@/constants';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React from 'react';

interface IModal {
    open: boolean;
    onClose: () => void;
}

const NewTaskModal: React.FC<IModal> = ({ open, onClose }) => {
    return (
        <Modal
            title="Nova tarefa"
            open={open}
            onCancel={onClose}
            destroyOnClose
            centered
        >
            <Form name="task" layout='vertical'>
                <Form.Item
                    label="Título"
                    rules={[
                        { required: true, message: "O título da tarefa deve ser inserido" }
                    ]}
                    style={{ marginTop: '24px' }}
                >
                    <Input
                        placeholder='Digite o título da tarefa'
                    />
                </Form.Item>
                <Form.Item label="Descrição">
                    <TextArea
                        placeholder='Digite a descrição da tarefa'
                    />
                </Form.Item>
                <Form.Item label="Prioridade">
                    <Select
                        placeholder='Selecione a prioridade da tarefa'
                        options={prOpts}
                        allowClear
                    />
                </Form.Item>
                <Form.Item label="Categoria">
                    <Select
                        placeholder='Selecione a categoria da tarefa'
                        options={ctOpts}
                        allowClear
                    />
                </Form.Item>
                <Form.Item label="Status">
                    <Select
                        placeholder='Selecione o status da tarefa'
                        options={stOpts}
                        allowClear
                    />
                </Form.Item>
                <Form.Item label='Data estimada para conclusão'>
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
