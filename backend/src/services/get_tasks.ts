import { FastifyInstance } from "fastify";
import { db } from "../../database/db_connection";

export const getTasks = async (app: FastifyInstance) => {
    app.get('/task', () => {
        return db('task').select("*").orderBy("created_at", "desc")
    })
}
