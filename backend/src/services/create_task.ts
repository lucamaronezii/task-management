import { FastifyInstance } from "fastify";
import { db } from "../../database/db_connection";

interface ICreateTask {
    name: string,
    description: string,
    priority: number,
    category: number,
    status: number,
    estimated_date: Date
}

export const createTask = async (app: FastifyInstance) => {
    app.post('/task', async (req, res) => {
        await db('task').insert(req.body)
        return res.status(201).send({ message: 'Task created successfully.' })
    })
}
