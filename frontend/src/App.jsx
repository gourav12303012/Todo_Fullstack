import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { sendSummaryToSlack } from './services/slackService';
import AddTodo from './components/AddTodo';
import List from './components/List';

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
    
      <AddTodo/>
      <br /><br />
     <List/>
    </div>
  );
};

export default App;
