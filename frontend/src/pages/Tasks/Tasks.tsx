import { ctOpts, prOpts, stOpts } from "@/constants";
import { ITask } from "@/services/create-task";
import { getFilteredTasks, getTasks } from "@/services/get-tasks";
import { FunnelSimple, Plus } from "@phosphor-icons/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Calendar, Divider, Flex, Form, Input, message, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import NewTaskModal from "./components/NewTaskModal";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";

export interface IListTask {
    total: number;
    tasks: ITask[]
}

export interface IFilterTask {
    estimated_date?: string;
    name?: string;
    priority?: number;
    category?: number;
    status?: number;
}

const Tasks = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = useForm()
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [openTask, setOpenTask] = useState<boolean>(false)
    const [filters, setFilters] = useState<IFilterTask | undefined>(undefined)
    const [selectedTask, setSelectedTask] = useState<number | undefined>(undefined)

    const onCreate = () => {
        setOpenForm(false)
        messageApi.success('Tarefa criada com sucesso!')
    }

    const onDeleted = () => {
        messageApi.success('Tarefa excluída com sucesso!')
    }

    const handleFilter = () => {
        form.validateFields().then(response => {
            let filter: any = {}
            Object.keys(response).forEach(item => {
                if (item === 'estimated_date' && response[item] !== undefined) {
                    filter[item] = response[item].format('YYYY-MM-DD')
                } else {
                    filter[item] = response[item]
                }
            })
            setFilters(filter)
            setTimeout(() => {
                refetch() // macaquice
            }, 100)
        })
    }

    const handleOpenTask = (id: number) => {
        setSelectedTask(id)
        setOpenTask(true)
    }

    const { data, isLoading, refetch } = useQuery<IListTask>({
        queryKey: ['list-tasks'],
        queryFn: () => filters ? getFilteredTasks(filters) : getTasks(),
    })

    return (
        <div className="w-full h-full grid grid-cols-[1fr] md:grid-cols-[21rem_1fr] gap-3">
            {contextHolder}
            <Form id="filters" form={form} className="flex flex-col gap-4 justify-center">
                <Form.Item name="estimated_date">
                    <Calendar
                        fullscreen={false}
                        defaultValue={null}
                    />
                </Form.Item>
                <Form.Item name='name'>
                    <Input placeholder="Filtrar pelo nome da tarefa" />
                </Form.Item>
                <Form.Item name='category'>
                    <Select
                        options={ctOpts}
                        placeholder="Filtrar pela categoria da tarefa"
                        allowClear
                    />
                </Form.Item>
                <Form.Item name='status'>
                    <Select
                        options={stOpts}
                        placeholder="Filtrar pelo status da tarefa"
                        allowClear
                    />
                </Form.Item>
                <Form.Item name="priority">
                    <Select
                        options={prOpts}
                        placeholder="Filtrar pela prioridade da tarefa"
                        allowClear
                    />
                </Form.Item>
                <Button
                    icon={<FunnelSimple />}
                    onClick={handleFilter}
                    type="primary"
                    className="w-28 self-end"
                >
                    Filtrar
                </Button>
            </Form>
            <div className="flex flex-col">
                <div className="flex justify-between pt-2">
                    <p className="text-2xl antialiased">Tarefas - {data && data.total}</p>
                    <Button icon={<Plus />} onClick={() => setOpenForm(true)}>Nova tarefa</Button>
                </div>
                <Divider />
                <div className="flex-1 relative md:overflow-y-auto">
                    {!data || isLoading ? (
                        <Flex justify="center">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <Flex vertical gap={6} className="w-full flex-1 md:absolute md:overflow-y-hidden">
                            {data.tasks.map((task, index) => (
                                <TaskItem key={index} task={task} onDeleted={onDeleted} onOpen={handleOpenTask} />
                            ))}
                        </Flex>
                    )}
                </div>
            </div>
            <NewTaskModal open={openForm} onClose={() => setOpenForm(false)} onCreate={onCreate} />
            {selectedTask &&
                <TaskModal id={selectedTask!} open={openTask} onClose={() => setOpenTask(false)} />
            }
        </div>
    )
}

export default Tasks
