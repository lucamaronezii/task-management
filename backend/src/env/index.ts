import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    DATABASE: z.string(),
    USERNAME: z.string(),
    PASSWORD: z.string(),
    HOST: z.string(),
    PORT: z.number().default(5432)
})

export const env = envSchema.parse(process.env)
