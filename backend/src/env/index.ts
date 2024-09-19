import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    DATABASE: z.string(),
    USERNAME: z.string(),
    PASSWORD: z.string(),
    HOST: z.string(),
    PORT: z.number().default(5432)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Variáveis de ambiente inválidas: ', _env.error.format())
}

export const env = _env.data!
