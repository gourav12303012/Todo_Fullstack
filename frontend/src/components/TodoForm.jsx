import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      addTodo(todo);
      setTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="border px-2 py-1 w-full"
        placeholder="Add a to-do..."
      />
    </form>
  );
};

export default TodoForm;
