import { expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/http/app'
import { execSync } from 'child_process'

describe('Task Endpoints', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(async () => {
        execSync('npm run knex migrate:latest')
    })

    test("User can create new task.", async () => {
        await request(app.server)
            .post('/task')
            .send({
                name: "Testando o testeeee",
                estimated_date: "2024-05-05"
            })
            .expect(201)
    })

    test("User can list created tasks", async () => {
        let cookie = '';
        let taskId: number;

        await request(app.server)
            .post('/task')
            .send({
                name: "Testando o testeeeee",
                estimated_date: "2024-05-05"
            })
            .expect(201)
            .then(res => {
                cookie = res.get("Set-Cookie")![0]
                taskId = res.body.id
            })

        const response = await request(app.server)
            .get('/task')
            .set("Cookie", cookie)
            .expect(200)

        expect(response.body.tasks).toEqual([
            expect.objectContaining({
                name: "Testando o testeeeee",
                estimated_date: expect.any(String)
            })
        ])
    })

    test("User can list specific task", async function () {
        let cookie = '';
        let taskId: number | undefined;

        await request(app.server)
            .post('/task')
            .send({
                name: "Testando o testeeeee",
                estimated_date: "2024-05-05"
            })
            .expect(201)
            .then(res => {
                cookie = res.get("Set-Cookie")![0]
                taskId = res.body.id
            })

        const response = await request(app.server)
            .get(`/task/${taskId}`)
            .set('Cookie', cookie)
            .expect(200)

        expect(response.body.id).toEqual(taskId)
    })

    test("User can delete specific task", async () => {
        let taskId: number | undefined;
        let cookie: string = '';

        await request(app.server)
            .post('/task')
            .send({
                name: "Teste de delete",
                estimated_date: "2024-10-10"
            })
            .expect((res) => {
                taskId = res.body.id;
                cookie = res.get('Set-Cookie')![0]
            })

        await request(app.server)
            .delete(`/task/${taskId}`)
            .set('Cookie', cookie)
            .expect(200)
    })
})
