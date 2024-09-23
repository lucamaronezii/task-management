import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV == "test") {
    config({ path: '.env.test' })
} else {
    config()
}

const envSchema = z.object({
    NODE_ENV: z.string(),
    DATABASE: z.string(),
    USERNAME: z.string(),
    PASSWORD: z.string(),
    HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Variáveis de ambiente inválidas: ', _env.error.format())
}

export const env = _env.data!
