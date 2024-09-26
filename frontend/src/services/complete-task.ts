export const completeTask = async (id: number, situation: boolean) => {
    await fetch(`http://localhost:3333/task/${id}/${String(situation)}`, {
        method: 'PATCH',
        credentials: 'include'
    })
}