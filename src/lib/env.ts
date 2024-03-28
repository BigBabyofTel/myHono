import * as z from 'zod';

//declare schema
const envSchema = z.object({
  PORT: z.string().min(1),
});

//fill the env variables
const parsedEnvs = envSchema.safeParse({
  PORT: process.env.PORT,
});

if (!parsedEnvs.success) {
  console.error(parsedEnvs.error.errors);
  //shutsdown the program
  process.exit(1);
}

export const ENV = parsedEnvs.data;
