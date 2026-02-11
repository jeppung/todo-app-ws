import { Router } from "express";
import { createTodoSchema } from "../validation/todos";
import { db } from "../db/db";
import { todosTable } from "../db/schema";

export const todosRouter = Router();

todosRouter.get("/", async (_, res) => {
  try {
    const todos = await db.select().from(todosTable);
    return res.json({ data: todos });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
});

todosRouter.post("/", async (req, res) => {
  const result = createTodoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  try {
    const [newTodo] = await db
      .insert(todosTable)
      .values({ title: result.data.title })
      .returning();

    if (res.app.locals.broadcastToAll) {
      res.app.locals.broadcastToAll(
        JSON.stringify({ type: "new_todo", data: newTodo }),
      );
    }
    return res.status(201).json({ data: newTodo });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
});
