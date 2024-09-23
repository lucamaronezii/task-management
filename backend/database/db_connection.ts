import knex, { Knex } from 'knex'
import { env } from '../src/env'

export const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        port: env.PORT,
        database: env.DATABASE,
    },
    migrations: {
        extension: 'ts',
    }
}

export const db = knex(dbConfig)
