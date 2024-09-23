import knex, { Knex } from 'knex'
import { env } from '../src/env'

export const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        database: env.DATABASE_URL,
        port: env.PORT
    },
    migrations: {
        extension: 'ts',
    }
}

export const db = knex(dbConfig)
