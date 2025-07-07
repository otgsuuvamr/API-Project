const express = require("express");
require("./db");
const ToDo = require("./models/ToDo");

const app = express();
const PORT = 3000;

// Middleware;
app.use(express.json());

// Rota de boas-vindas
app.get("/", (req, res) => {
  res.status(200).send("Boas-vindas à API");
});

// Criar uma nova tarefa
app.post("/tasks", async (req, res) => {
  const { descricao } = req.body;
  if (!descricao) {
    return res.status(400).json({ erro: "Preencha a descrição" });
  }
  try {
    const newTask = new ToDo({ descricao });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao incluir tarefa" });
  }
});

// Deletar uma tarefa pelo ID
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await ToDo.findByIdAndDelete(id); // Corrigido: "task" no singular
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada!" });
    }
    res.status(204).send();
  } catch (error) {
    return res.status(400).json({ erro: "Erro ao remover tarefa." });
  }
});

// Ler todas as tarefas
app.get("/tasks", async (req, res) => {
  try {
    // Busca todas as tarefas
    const tasks = await ToDo.find();

    // Conta quantas tarefas existem
    const totalTasks = tasks.length;

    // Responde com todas as tarefas e o total
    res.status(200).json({
      totalTasks,
      tasks
    });
  } catch (error) {
    return res.status(400).json({ erro: "Erro ao ler tarefas." });
  }
});

// Ler uma tarefa pelo ID
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await ToDo.findById(id); // Buscar a tarefa específica pelo ID
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada!" });
    }
    res.status(200).json(task); // Retorna a tarefa encontrada
  } catch (error) {
    return res.status(400).json({ erro: "Erro ao ler tarefa." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
