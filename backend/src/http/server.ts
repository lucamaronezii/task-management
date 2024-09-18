import fastify from 'fastify'
import { getTasks } from '../services/get_tasks'
import { createTask } from '../services/create_task'
import dotenv from 'dotenv'

dotenv.config()

const app = fastify()

app.register(getTasks)
app.register(createTask)

app.listen({
    port: 3333,
}).then(_ => {
    console.log("Server running")
})
