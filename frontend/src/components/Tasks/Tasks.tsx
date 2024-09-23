import { Calendar, Input, Select, theme } from "antd";

const Tasks = () => {
    const { token } = theme.useToken();

    return (
        <div className="bg-red-600 w-full h-full grid grid-cols-[21rem_1fr] gap-3">
            <div className="bg-blue-500 flex flex-col gap-2 justify-center">
                <Calendar fullscreen={false} />
                <Input placeholder="Filtrar pelo nome da tarefa" />
                <Select placeholder="Filtrar pela categoria da tarefa" />
                <Select placeholder="Filtrar pelo status da tarefa" />
                <Select placeholder="Filtrar pela prioridade da tarefa" />
            </div>
            <div className="bg-blue-500">
                <p>aaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa </p>
            </div>
        </div>
    )
}

export default Tasks
