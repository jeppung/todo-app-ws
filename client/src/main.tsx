import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import TodoDetail from "./components/TodoDetail.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="todos/:id" element={<TodoDetail />} />
        <Route
          path="*"
          element={<h1 className="text-3xl font-semibold">404 Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
