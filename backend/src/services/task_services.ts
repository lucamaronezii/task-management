import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../database/db_connection";
import crypto, { UUID } from 'node:crypto'
import { checkSessionId } from "../middleware/check-session";

export const tasksEndpoints = async (app: FastifyInstance) => {
    app.addHook('preHandler', checkSessionId)

    app.get('/', async (req) => {
        const { session_id } = req.cookies

        const tasks = await db('task')
            .select("*")
            .where("session_id", session_id)
            .orderBy("created_at", "desc")

        return {
            total: tasks.length,
            tasks
        }
    })

    app.get('/:id', async (req) => {
        const { session_id } = req.cookies

        const getTaskParamsSchema = z.object({
            id: z.string().uuid()
        })

        const params = getTaskParamsSchema.parse(req.params)

        const task = await db('task')
            .select("*")
            .where("id", params.id)
            .andWhere("session_id", session_id)
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

        let sessionId = req.cookies.session_id

        if (!sessionId) {
            sessionId = crypto.randomUUID()
            reply.cookie("session_id", sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
        }

        const response = await db('task').insert({
            id: crypto.randomUUID(),
            session_id: sessionId as UUID,
            ...body
        }).returning("id")

        return reply.status(201).send(response[0])
    })

    app.delete('/:id', async (req, rep) => {
        const deleteTaskParamsSchema = z.object({
            id: z.string().uuid()
        })

        const params = deleteTaskParamsSchema.parse(req.params)

        await db('task')
            .delete()
            .where("id", params.id)

        return rep.status(200).send({ message: "Task deleted sucessfully!" })
    })
}
