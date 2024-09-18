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
        const { body } = req
        req.body
        const response = await db('task').insert({
            id: crypto.randomUUID(),
            ...body as Object
        }).returning("*")
        return res.status(201).send(response[0])
    })
}
