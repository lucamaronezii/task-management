import cookie from '@fastify/cookie'
import dotenv from 'dotenv'
import fastify from 'fastify'
import { authEndpoints } from '../services/auth_services'
import { tasksEndpoints } from '../services/task_services'

dotenv.config()

export const app = fastify()

//plugins
app.register(cookie)

app.register(authEndpoints, {
    prefix: 'auth'
})
app.register(tasksEndpoints, {
    prefix: 'task'
})