import type { Todo } from "../types/todo";

export const todoService = {
  getTodos: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return (await response.json()) as { data: Todo[] };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unknown error" };
    }
  },
  createTodo: async (title: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      return (await response.json()) as { data: Todo };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unknown error" };
    }
  },
};
