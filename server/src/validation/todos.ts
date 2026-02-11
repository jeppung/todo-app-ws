import z from "zod";

const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
});

export { createTodoSchema };
