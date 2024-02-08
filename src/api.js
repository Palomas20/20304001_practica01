const express = require("express");
const bodyParser = require("body-parser");
const taskRepository = require("./taskRepository");
const app = express();

app.use(bodyParser.json());
let tasks = [
  { id: 1, title: "Task 1", description: "Do something" },
  { id: 2, title: "Task 2", description: "Do something else" },
  { id: 3, title: "Task 3", description: "Do something" },
  { id: 4, title: "Task 4", description: "Do something else" },
];

app.get("/issue", (req, res) => {
  res.json(issue);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  const tasks = taskRepository.getAll();
  res.json(tasks);
});

// Get a specific task
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = taskRepository.getById(taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Create a new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  taskRepository.createTask(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const updatedTaskResult = taskRepository.updateTask(taskId, updatedTask);
    if (updatedTaskResult) {
      res.json(updatedTaskResult);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  taskRepository.deleteTask(taskId);
  res.sendStatus(204);
});

module.exports = app;
