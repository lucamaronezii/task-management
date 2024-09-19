import dotenv from 'dotenv'
import fastify from 'fastify'
import { tasksEndpoints } from '../services/task_services'
import cookie from '@fastify/cookie'
import { authEndpoints } from '../services/auth_services'

dotenv.config()

const app = fastify()

//plugins
app.register(cookie)

app.register(authEndpoints, {
    prefix: 'auth'
})
app.register(tasksEndpoints, {
    prefix: 'task'
})

app.listen({
    port: 3333,
}).then(_ => {
    console.log("Server running")
})
