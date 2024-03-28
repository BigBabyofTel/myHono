import { Hono } from "hono";

const app = new Hono();

app.get("/api/v1", (c) => {
  return new Response("Good Morning!");
});

app.get("/", (c) => {
  return c.text("This is a test");
});

app.get("/api/v1", (c) => {
  return c.json({
    ok: true,
    message: "Hello Hono!",
  });
});

export default app;
