import fastify from 'fastify'
import { getTasks } from '../services/get_tasks'
import { createTask } from '../services/create_task'

const app = fastify()

app.register(getTasks)
app.register(createTask)

app.listen({
    port: 3333,
}, function (err, address) {
    if (err) {
        console.error(err)
    }
    console.log('Server running. Address:', address)
})
