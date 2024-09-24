

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