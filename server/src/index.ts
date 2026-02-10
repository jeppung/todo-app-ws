import "dotenv/config";
import express from "express";
import { todosRouter } from "./routes/todos";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/todos", todosRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
