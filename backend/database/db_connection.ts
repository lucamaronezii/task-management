import knex, { Knex } from 'knex'
import { env } from '../src/env'

export const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        host: env.HOST,
        port: env.PORT,
        user: env.USERNAME,
        password: env.PASSWORD,
        database: env.DATABASE,
    },
    migrations: {
        extension: 'ts',
    }
}

export const db = knex(dbConfig)
