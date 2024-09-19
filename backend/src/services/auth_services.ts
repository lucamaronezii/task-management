import { FastifyInstance } from "fastify";
import { z } from "zod";

export const authEndpoints = async (app: FastifyInstance) => {
    app.post('/', async (req) => {
        const validadeUserData = z.object({
            email: z.string(),
            password: z.string()
        })
    })
}