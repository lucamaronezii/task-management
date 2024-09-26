import { ITask } from '@/services/create-task';
import { getTaskById } from '@/services/get-tasks';
import { useQuery } from '@tanstack/react-query';
import { DatePicker, Flex, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { IModal } from './NewTaskModal';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'antd/es/form/Form';
import { ctOpts, prOpts, stOpts } from '@/constants';

interface ITaskModal extends IModal {
    id: number;
}

const TaskModal: React.FC<ITaskModal> = ({ id, open, onClose }) => {
    const [form] = useForm()

    const { data, isLoading, refetch } = useQuery<ITask>({
        queryKey: ['list-task-id'],
        queryFn: () => getTaskById(id),
    })

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={data?.name}
            footer={null}
            centered
        >
            {isLoading || !data ? (
                <>aaa</>
            ) : (
                <Flex vertical gap={24} style={{ marginTop: 24 }}>
                    <Input readOnly value={data.name} />
                    <Input readOnly value={data.description} />
                    <Select value={data.priority} options={prOpts} style={{ minWidth: '100%' }} />
                    <Select value={data.category} options={ctOpts} style={{ minWidth: '100%' }} />
                    <Select value={data.status} options={stOpts} style={{ minWidth: '100%' }} />
                    <DatePicker value={dayjs(data.estimated_date)} format={'DD/MM/YYYY'}/>
                    <p style={{ alignSelf: 'end' }}>Criada em {dayjs(data.created_at).format('DD/MM/YYYY')}</p>
                </Flex>
            )}
        </Modal>
    )
}

export default TaskModal
