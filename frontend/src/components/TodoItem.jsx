import React, { useState } from 'react';

const TodoItem = ({ index, todo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(todo);

  const handleEdit = () => {
    if (newValue.trim() === "") return; // Prevent empty todos
    editTodo(index, newValue.trim());
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-3 transition-shadow shadow-md mb-3">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleEdit}
            className="ml-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            Save
          </button>
          <button
            onClick={() => { setIsEditing(false); setNewValue(todo); }}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-xl transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="text-gray-800 font-medium break-words">{todo}</span>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="mr-3 text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(index)}
              className="text-red-600 hover:text-red-800 font-semibold transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
