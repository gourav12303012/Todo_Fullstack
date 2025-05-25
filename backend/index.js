const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

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
    await axios.post('https://hooks.slack.com/services/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', {
      text: summary
    });
    res.status(200).json({ message: 'Summary sent to Slack' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send to Slack' });
  }
});

const PORT =  3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
