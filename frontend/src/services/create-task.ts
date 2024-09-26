
export interface ITask {
    id: number;
    name: string;
    description: string;
    priority: number;
    status: number;
    category: number;
    estimated_date: string;
    concluded: boolean;
    created_at: string;
}

export const createTask = async (request: ITask) => {
    await fetch('http://localhost:3333/task', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    })
}
