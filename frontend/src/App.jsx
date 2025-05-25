import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { sendSummaryToSlack } from './services/slackService';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const addTodo = (todo) => setTodos([...todos, todo]);
  const editTodo = (index, updatedTodo) => {
    const newTodos = [...todos];
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  };
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleSendSummary = async () => {
    const summary = todos.map((todo, i) => `${i + 1}. ${todo}`).join('\n');
    const success = await sendSummaryToSlack(summary);
    setMessage(success ? "✅ Summary sent successfully!" : "❌ Failed to send summary.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 flex items-center gap-3">
            📝 <span>My To-Do List</span>
          </h1>
        </div>

        <TodoForm addTodo={addTodo} />

        <div className="mt-6">
          <TodoList todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSendSummary}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            📤 Send Summary to Slack
          </button>
        </div>

        {message && (
          <p className={`mt-6 text-center font-medium text-lg ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
