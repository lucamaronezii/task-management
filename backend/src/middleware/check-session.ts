import { FastifyReply, FastifyRequest } from "fastify";

export const checkSessionId = async (request: FastifyRequest, reply: FastifyReply) => {
    const sessionId = request.cookies.session_id

    if (request.method == "POST") {
        return;
    }

    if (!sessionId) return reply
        .status(401)
        .send({ message: "Unauthorized" })
}
