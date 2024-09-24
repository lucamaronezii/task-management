import knex, { Knex } from 'knex'
import dotnev from 'dotenv'

dotnev.config()

export const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        database: process.env.DATABASE_URL,
        port: Number(process.env.PORT)
    },
    migrations: {
        extension: 'ts',
    }
}

export const db = knex(dbConfig)
