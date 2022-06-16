import { app, port } from "./server";

app.listen(port, () => console.log(`Starting at localhost:${port}`));