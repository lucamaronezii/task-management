import { completeTask } from '@/services/complete-task'
import { ITask } from '@/services/create-task'
import { deleteTask } from '@/services/delete-task'
import { ClipboardText, TrashSimple } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Checkbox, Flex, Popconfirm, Typography } from 'antd'
import React from 'react'

interface ITaskItem extends React.HTMLProps<any> {
    task: ITask;
    onDeleted: () => void;
    onOpen: (id: number) => void;
}

const TaskItem: React.FC<ITaskItem> = ({ task, onDeleted, onOpen }) => {
    const queryClient = useQueryClient()

    const { mutate: deleteMutate, isPending: deletePending } = useMutation({
        mutationFn: () => deleteTask(task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-tasks'] })
            onDeleted()
        }
    })

    const { mutate: completeMutate } = useMutation({
        mutationFn: (situation: boolean) => completeTask(task.id, situation),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['list-tasks'] })
    })

    return (
        <Flex
            className='w-full h-10 bg-zinc-900 rounded-md box-border 
            py-2 px-3 hover:bg-zinc-800 cursor-pointer transition-all items-center justify-between'
            onClick={() => onOpen(task.id)}
        >
            <div className='flex items-center gap-4 overflow-auto'>
                <div className='min-w-5'>
                    <ClipboardText size={20} weight="duotone" />
                </div>
                <Typography className='text-zinc-200 font-medium overflow-hidden text-nowrap text-ellipsis'>{task.name}</Typography>
            </div>
            <Flex gap={10} align='center'>
                <Checkbox
                    checked={task.concluded}
                    onClick={(e) => {
                        completeMutate(!task.concluded)
                        e.stopPropagation()
                    }}
                />
                <Popconfirm
                    title="Tem certeza que deseja excluir a tarefa?"
                    placement='bottom'
                    okButtonProps={{ loading: deletePending }}
                    onConfirm={(e) => { deleteMutate(); e?.stopPropagation() }}
                    onCancel={(e) => e?.stopPropagation()}
                >
                    <Button
                        shape='circle'
                        icon={<TrashSimple />}
                        danger
                        size='small'
                        type='primary'
                        onClick={(e) => e.stopPropagation()}
                    />
                </Popconfirm>
            </Flex>
        </Flex>
    )
}

export default TaskItem
