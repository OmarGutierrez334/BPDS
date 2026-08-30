"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // crear tarea con Enter
  function handleAddTask(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (newTask.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  }

  // tachar tarea
  function toggleComplete(id: number) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  // guarda al salir del input
  function saveEdit(id: number) {
    setTodos(
      todos.map((t) =>
        t.id === id && editingText.trim() !== "" ? { ...t, text: editingText } : t
      )
    );
    setEditingId(null);
  }

  function deleteTask(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        fontFamily: "sans-serif",
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Mis tareas</h1>
      <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: "16px" }} />

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleAddTask}
        placeholder="Escribe una tarea y presiona Enter"
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          border: "1px solid #999",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid #ddd" }}
          >
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />

            {editingId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                autoFocus
                style={{ flex: 1, padding: "4px" }}
              />
            ) : (
              <span
                onClick={() => startEditing(todo)}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#999" : "#000",
                }}
              >
                {todo.text}
              </span>
            )}

            <button onClick={() => deleteTask(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}