import knex, { Knex } from 'knex'
import { env } from '../src/env'
console.log(process.env.DATABASE_URL)
export const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        database: process.env.DATABASE_URL,
        port: env.PORT
    },
    migrations: {
        extension: 'ts',
    }
}

export const db = knex(dbConfig)
