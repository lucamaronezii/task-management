import knex, { Knex } from 'knex'

export const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        host: process.env.HOST,
        port: process.env.PORT as number | undefined,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'tk_mg'
    },
    migrations: {
        extension: 'ts',
    }
}

export const db = knex(dbConfig)
