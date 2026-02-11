import "dotenv/config";
import express from "express";
import { todosRouter } from "./routes/todos";
import { attachWebSocketServer } from "./ws/ws";
import http from "http";

const app = express();
const server = new http.Server(app);

// Server setup (attach ws)
const { broadcastToAll } = attachWebSocketServer(server);

// Express setup (middlewares, routes)
app.use(express.json());
app.get("/", (_, res) => {
  res.json({ message: "Hello, World!" });
});
app.use("/todos", todosRouter);
app.locals.broadcastToAll = broadcastToAll;

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
