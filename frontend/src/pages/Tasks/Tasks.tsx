import { ctOpts, prOpts, stOpts } from "@/constants";
import { Button, Calendar, Divider, Input, Select } from "antd";
import NewTaskModal from "./components/NewTaskModal";
import { useState } from "react";

const Tasks = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="w-full h-full grid grid-cols-[21rem_1fr] gap-3">
            <div className="flex flex-col gap-4 justify-center">
                <Calendar fullscreen={false} />
                <Input placeholder="Filtrar pelo nome da tarefa" />
                <Select options={ctOpts} placeholder="Filtrar pela categoria da tarefa" />
                <Select options={stOpts} placeholder="Filtrar pelo status da tarefa" />
                <Select options={prOpts} placeholder="Filtrar pela prioridade da tarefa" />
            </div>
            <div>
                <div className="flex justify-between">
                    <p className="text-2xl antialiased">Tarefas</p>
                    <Button onClick={() => setOpen(true)}>Nova tarefa</Button>
                </div>
                <Divider />
            </div>
            <NewTaskModal open={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default Tasks
