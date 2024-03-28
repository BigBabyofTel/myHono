import { Hono } from 'hono';
import { ENV } from './lib/env';
import { z, ZodError } from 'zod';

const app = new Hono();

const validateUser = z.object({
  name: z.string().min(3, 'Please provide 3 characters').trim(),
  age: z.number().min(1).max(100),
  email: z.string().email(),
});

app.post('/', async (c) => {
  const body = await c.req.json();

  try {
    const { age, name } = validateUser.parse(body);
  } catch (e) {
    if (e instanceof ZodError) {
        console.log(e.errors)
        const arr = []
        for (let error of e.errors) {
          const errObj: Record<string, string> = {};
          const key = error.path[0];
          errObj[key] = error.message;
          arr.push(errObj)
        }

      c.status(422);
      return c.json({ errors: arr })
    }
    c.status(500)
    return c.json({ msg: 'something went wrong' });
  }
  return c.json(body);
});

app.get('/', (c) => {
  console.log(process.env.PORT);
  return c.json('This is a test');
});

export default {
  port: ENV.PORT,
  fetch: app.fetch,
};
