const ToDo = require("../models/ToDo");

// Criar uma nova tarefa
exports.create = async (req, res) => {
  const { titulo, descricao, categoria } = req.body;
  if (!titulo) {
    // Tratativas de campos:
    return res.status(400).json({ erro: "Preencha o título." });
  }
  if (!descricao) {
    return res.status(400).json({ erro: "Preencha a descrição." });
  }
  if (!categoria) {
    return res.status(400).json({ erro: "Preencha a categoria." });
  }
  try {
    // Criação de tarefa:
    const newTask = new ToDo({ titulo, descricao, categoria });
    await newTask.save(); // Salva a tarefa criada
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao incluir tarefa" });
  }
};

// Atualizar uma tarefa pelo ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, categoria } = req.body;
  if (!titulo) {
    // Tratativas de campos:
    return res.status(400).json({ erro: "Preencha o novo título." });
  }
  if (!descricao) {
    return res.status(400).json({ erro: "Preencha a nova descrição." });
  }
  if (!categoria) {
    return res.status(400).json({ erro: "Preencha a nova categoria." });
  }
  try {
    const tasks = await ToDo.findByIdAndUpdate(
      // Atualiza a tarefa e seus campos pelo ID:
      id,
      { titulo },
      { descricao },
      { categoria },
      { new: true }
    );
    if (!tasks) {
      return res.status(404).json({ erro: "Tarefa inexistente." });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar tarefa." });
  }
};

// Deletar uma tarefa pelo ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await ToDo.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada!" });
    }
    res.status(204).send();
  } catch (error) {
    return res.status(400).json({ erro: "Erro ao remover tarefa." });
  }
};

// Ler todas as tarefas
exports.read = async (req, res) => {
  try {
    // Busca todas as tarefas
    const tasks = await ToDo.find();

    // Conta quantas tarefas existem
    const totalTasks = tasks.length;

    // Responde com todas as tarefas e o total
    res.status(200).json({
      totalTasks,
      tasks,
    });
  } catch (error) {
    return res.status(400).json({ erro: "Erro ao ler tarefas." });
  }
};

// Ler uma tarefa pelo ID
exports.readID = async (req, res) => {
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
};
