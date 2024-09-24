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
    const handleFilters = () => {

    }
    const response = await fetch('http://localhost:3333/task/filter?', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}