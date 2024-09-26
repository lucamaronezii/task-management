import { IFilterTask } from "@/pages/Tasks/Tasks";

export const getTasks = async () => {
    const response = await fetch('http://localhost:3333/task', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json();
}

export const getFilteredTasks = async (fts: IFilterTask) => {
    let url = ''

    if (fts.estimated_date) (url += `&estimated_date=${String(fts.estimated_date)}`)
    if (fts.name) (url += `&name=${String(fts.name)}`)
    if (fts.category) (url += `&category=${String(fts.category)}`)
    if (fts.priority) (url += `&priority=${String(fts.priority)}`)
    if (fts.status) (url += `&status=${String(fts.status)}`)

    const response = await fetch(`http://localhost:3333/task/filter?${url}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export const getTaskById = async (id: number) => {
    const response = await fetch(`http://localhost:3333/task/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json();
}