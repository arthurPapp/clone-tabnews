import { config } from "dotenv";
import z from "zod";


const envSchema = z.object({
    POSTGRES_HOST: z.string().default("production"),
    POSTGRES_PORT: z.coerce.number().default(112),
    POSTGRES_USER: z.string().default("local"),
    POSTGRES_DB: z.string().default("local"),
    POSTGRES_PASSWORD: z.string().default("local"),
    NODE_ENV: z.string().default("production")
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format())
    process.exit(1)
}

export const env = _env.data;