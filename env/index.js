import { config } from "dotenv";
import z from "zod";


const envSchema = z.object({
    POSTGRES_HOST: z.string().default("localhost"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_USER: z.string().default("postgres"),
    POSTGRES_DB: z.string().default("postgres"),
    POSTGRES_PASSWORD: z.string().default("@Materuzo199")
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format())
    process.exit(1)
}

export const env = _env.data;