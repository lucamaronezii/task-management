export const updateTask = async (id: number, body: Object) => {
    await fetch(`http://localhost:3333/task/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}
