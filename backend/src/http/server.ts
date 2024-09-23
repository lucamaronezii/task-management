import { app } from "./app"

app.listen({
    port: 3333,
}).then(_ => {
    console.log("Server running")
})
