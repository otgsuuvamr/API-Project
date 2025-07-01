const express = require("express");
const app = express();
const PORT = 3000;

// Middleware;
app.use(express.json());

// Array (Tipo Banco de Dados);
let tasks = [];
let currentId = 1;

app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo à API!");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Título Obrigatório" });
  }
  const newTask = { id: currentId++, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
