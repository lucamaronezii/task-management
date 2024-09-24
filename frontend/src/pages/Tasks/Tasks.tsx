import { ctOpts, prOpts, stOpts } from "@/constants";
import { Button, Calendar, Divider, Flex, Input, message, Select, Spin } from "antd";
import NewTaskModal from "./components/NewTaskModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/get-tasks";
import { ITask } from "@/services/create-task";
import TaskItem from "./components/TaskItem";

interface IListTask {
    total: number;
    tasks: ITask[]
}

const Tasks = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [open, setOpen] = useState<boolean>(false)

    const onCreate = () => {
        setOpen(false)
        messageApi.success('Tarefa criada com sucesso.')
    }

    const { data, isLoading } = useQuery<IListTask>({
        queryKey: ['list-tasks'],
        queryFn: getTasks,
    })

    return (
        <div className="w-full h-full grid grid-cols-[21rem_1fr] gap-3">
            {contextHolder}
            <div className="flex flex-col gap-4 justify-center">
                <Calendar fullscreen={false} defaultValue={undefined} onChange={(value) => console.log(value.format('YYYY-MM-DD'))} />
                <Input placeholder="Filtrar pelo nome da tarefa" />
                <Select
                    options={ctOpts}
                    placeholder="Filtrar pela categoria da tarefa"
                    allowClear
                />
                <Select
                    options={stOpts}
                    placeholder="Filtrar pelo status da tarefa"
                    allowClear
                />
                <Select
                    options={prOpts}
                    placeholder="Filtrar pela prioridade da tarefa"
                    allowClear
                />
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between pt-2">
                    <p className="text-2xl antialiased">Tarefas - {data && data.total}</p>
                    <Button onClick={() => setOpen(true)}>Nova tarefa</Button>
                </div>
                <Divider />
                <div className="flex-1 relative overflow-y-auto">
                    {!data || isLoading ? (
                        <Flex justify="center">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <Flex vertical gap={6} className="w-full flex-1 absolute overflow-y-hidden">
                            {data.tasks.map((task, index) => (
                                <TaskItem task={task} key={index} />
                            ))}
                        </Flex>
                    )}
                </div>
            </div>

            <NewTaskModal open={open} onClose={() => setOpen(false)} onCreate={onCreate} />
        </div>
    )
}

export default Tasks
