const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const checkToken = require("../middlewares/authMiddleware");

// Получение списка всех проектов
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавление нового проекта
router.post("/", checkToken, async (req, res) => {
  console.log(req.user);
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    stack: req.body.technologies,
    user: req.user.userId, // добавляем ссылку на пользователя
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Обновление информации о конкретном проекте
router.put("/:id", checkToken, async (req, res) => {
  let project;

  try {
    project = await Project.findOne({ _id: req.params.id });
    if (!project) {
      return res.status(404).json({ message: "Проект не найден" });
    }
    // проверяем, что проект принадлежит авторизованному пользователю
    if (project.user !== req.user.id) {
      return res.status(403).json({ message: "Доступ запрещен" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  project.name = req.body.name;
  project.description = req.body.description;
  project.stack = req.body.stack;

  try {
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Удаление конкретного проекта
router.delete("/:id", checkToken, async (req, res) => {
  let project;

  try {
    project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Проект не найден" });
    }
    // проверяем, что проект принадлежит авторизованному пользователю
    if (!project.user || project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Доступ запрещен" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  try {
    await project.remove();
    res.json({ message: "Проект удален" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Удаление всех проектов
router.delete("/", async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
