export const deleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:3333/task/${id}`, {
        method: 'DELETE',
        credentials: "include",
    })

    return response.json()
}