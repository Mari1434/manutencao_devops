const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const MONGO_URL = 'mongodb://db:27017/devops';
mongoose.connect(MONGO_URL)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));
const Task = mongoose.model('Task', {
title: String
});
app.get('/', (req, res) => {
res.send('API DevOps funcionando 🚀');
});
app.post('/tasks', async (req, res) => {
const task = new Task({ title: req.body.title });
await task.save();
res.json(task);
});
app.get('/tasks', async (req, res) => {
const tasks = await Task.find();
res.json(tasks);
});
app.listen(3000, () => {
console.log('Servidor rodando na porta 3000');
});