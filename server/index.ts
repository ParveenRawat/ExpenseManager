import app from "./app";

const port = process.env.PORT || 3000;

Bun.serve({
  port: port,
  fetch: app.fetch,
});

console.log("The server is running on port : ", port);
