import { ITask } from '@/services/create-task'
import { ClipboardText, Horse } from '@phosphor-icons/react'
import { Checkbox, Flex, Typography } from 'antd'
import React from 'react'

const TaskItem: React.FC<{ task: ITask }> = ({ task }) => {
    return (
        <Flex
            className='w-full h-10 bg-zinc-800 rounded-md box-border 
            py-2 px-3 hover:bg-zinc-900 cursor-pointer transition-all items-center justify-between'
            onClick={() => { }}
        >
            <div className='flex items-center gap-4'>
                <ClipboardText size={22} weight="duotone" />
                <Typography className='text-zinc-200'>{task.name}</Typography>
            </div>
            <Checkbox />
        </Flex>
    )
}

export default TaskItem
