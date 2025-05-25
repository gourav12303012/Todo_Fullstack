import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import cors from 'cors';

import todoRute from './router/todo.router.js';
import connectDb from './uitls/connectDb.js';

const app = express();
app.use(bodyParser.json());

const corsOption = {
  origin: ["https://todo-fullstack-1-xol3.onrender.com/"],
  credentials: true
};
app.use(cors(corsOption));

app.use("/todo", todoRute);

// In-memory todos array (not connected to DB yet)
let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: uuidv4(), title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.post('/summarize', async (req, res) => {
  const summary = `You have ${todos.length} todos:\n` +
    todos.map(t => `• ${t.title}`).join('\n');

  try {
    await axios.post(
      'https://hooks.slack.com/services/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',
      { text: summary }
    );
    res.status(200).json({ message: 'Summary sent to Slack' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send to Slack' });
  }
});

// Connect to DB then start the server
const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('❌ Failed to connect to DB:', err);
});
