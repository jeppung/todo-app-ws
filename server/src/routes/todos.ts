import { Router } from "express";

export const todosRouter = Router();

todosRouter.get("/", (_, res) => {
  return res.json({ todos: [] });
});
