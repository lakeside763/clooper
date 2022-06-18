import { app, port, shutdown } from "./server";

const server = app.listen(port, () => console.log(`Starting at localhost:${port}`));

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});
