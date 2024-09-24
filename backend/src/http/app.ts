import cookie from '@fastify/cookie'
import dotenv from 'dotenv'
import fastify from 'fastify'
import { authEndpoints } from '../services/auth_services'
import { tasksEndpoints } from '../services/task_services'
import cors from "@fastify/cors"

dotenv.config()

export const app = fastify()

//plugins
app.register(cookie)
app.register(cors, {
    origin: true,
    credentials: true
})

app.register(authEndpoints, {
    prefix: 'auth'
})
app.register(tasksEndpoints, {
    prefix: 'task'
})