import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { todoService } from "./services/todo";
import type { Todo } from "./types/todo";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const isConnectedWsRef = useRef<boolean>(false);

  const addTodoHandler = async (form: FormData) => {
    const todo = form.get("todo");
    if (typeof todo !== "string" || !todo.trim()) {
      alert("Please enter a valid todo");
      return;
    }
    const response = await todoService.createTodo(todo.trim());
    if ("error" in response) {
      alert(response.error);
    } else {
      alert("Todo created successfully");
    }
  };

  const websocketHandler = () => {
    const ws = new WebSocket(
      `${import.meta.env.VITE_API_BASE_URL.replace("http", "ws")}/ws`,
    );

    ws.addEventListener("open", () => {
      console.log("WebSocket connected");
    });

    ws.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "new_todo" && message.data?.id) {
          setTodos((prevTodos) => [message.data as Todo, ...prevTodos]);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    });

    return ws;
  };

  useEffect(() => {
    (async () => {
      const res = await todoService.getTodos();
      if ("data" in res) {
        setTodos(res.data.reverse());
      }
    })();
  }, []);

  useEffect(() => {
    let ws: WebSocket;
    if (!isConnectedWsRef.current) {
      ws = websocketHandler();
      isConnectedWsRef.current = true;
    }
    return () => {
      if (isConnectedWsRef.current) {
        ws.close();
        isConnectedWsRef.current = false;
      }
    };
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center">
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-semibold">Todo Together</h1>
        <div className="mt-5 mx-auto w-fit">
          <form action={addTodoHandler} className="flex gap-2">
            <Input
              className="w-96"
              name="todo"
              placeholder="Insert your todo"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div className="mt-20 w-screen grid xl:grid-cols-3 md:grid-cols-2 gap-4 px-20 pb-10">
          {todos.map((todo) => {
            return (
              <Card
                key={todo.id}
                className="transition duration-100 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="text-left">
                    {new Date(todo.createdAt).toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <p>{todo.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default App;
