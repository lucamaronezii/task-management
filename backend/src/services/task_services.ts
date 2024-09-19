import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../database/db_connection";

export const tasksEndpoints = async (app: FastifyInstance) => {
    app.get('/', async () => {
        const tasks = await db('task')
            .select("*")
            .orderBy("created_at", "desc")

        return {
            total: tasks.length,
            tasks
        }
    })

    app.get('/:id', async (req, reply) => {
        const getTaskParamsSchema = z.object({
            id: z.string().uuid()
        })

        const params = getTaskParamsSchema.parse(req.params)

        const task = await db('task')
            .select("*")
            .where("id", params.id)
            .first()

        return task == undefined ? { message: "Not found" } : task
    })

    app.post('/', async (req, reply) => {
        const createTaskBodySchema = z.object({
            name: z.string(),
            description: z.string().optional(),
            priority: z.number().optional(),
            category: z.number().optional(),
            status: z.number().optional(),
            estimated_date: z.string()
        })

        const body = createTaskBodySchema.parse(req.body)

        let sessionId = req.cookies.sessionId

        if (!sessionId) {
            sessionId = crypto.randomUUID()
            reply.cookie("session_id", sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }

        await db('task').insert({
            id: crypto.randomUUID(),
            // session_id: sessionId,
            ...body
        })

        return reply.status(201).send()
    })
}
