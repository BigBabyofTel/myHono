import { Hono } from 'hono';
import { ENV } from './lib/env';

const app = new Hono();

app.get('/', (c) => {
  console.log(process.env.PORT);
  return c.json('This is a test');
});

export default {
  port: ENV.PORT,
  fetch: app.fetch,
};
