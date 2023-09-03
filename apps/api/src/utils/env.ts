import { z } from 'zod'

const envValidationSchema = z.object({
  DATABASE_HOST: z.string().default('127.0.0.1'),
  DATABASE_USERNAME: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_NAME: z.string().default('postgres'),
  DATABASE_PORT: z.number().default(5432),
  PORT: z.number().default(8080),
  HOST: z.string().default('127.0.0.1'),
})

export const env = envValidationSchema.parse(process.env)
