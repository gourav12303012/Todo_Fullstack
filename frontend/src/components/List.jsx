import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("https://todo-fullstack-sekc.onrender.com/todo/allTask");
        if (res.data.success) {
          setTodos(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching todos", err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      {todos.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{todo.title}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <span
                  className={`capitalize font-medium ${
                    todo.priority === "high"
                      ? "text-red-500"
                      : todo.priority === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {todo.priority}
                </span>
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(todo.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
