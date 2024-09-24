
export interface ITask {
    name: string;
    description: string;
    priority: number;
    status: number;
    category: number;
    estimated_date: string;
    concluded: boolean;
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
