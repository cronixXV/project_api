const express = require("express");
const router = express.Router();
const technologyController = require("../controllers/technologyController");
const fs = require("fs");
const path = require("path");

const technologiesFilePath = path.join(__dirname, "../data/technologies.json");

// Массив технологий, которые мы хотим отобразить на фронтенде
const technologies = [
  { name: "HTML5", icon: "icons/stack/HTML5.svg" },
  { name: "CSS3", icon: "icons/stack/css.svg" },
  { name: "JavaScript", icon: "icons/stack/Javascript.svg" },
  { name: "Git", icon: "icons/stack/git.svg" },
  { name: "Node.js", icon: "icons/stack/Nodejs.svg" },
  { name: "React", icon: "icons/stack/react.svg" },
];

router.get("/", (req, res) => {
  res.json(technologies);
});

// Получение списка технологий
router.get("/", async (req, res) => {
  try {
    const technologies = await technologyController.readTechnologies();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Добавление новой технологии
router.post("/", async (req, res) => {
  try {
    const newTech = req.body;
    const technologies = await technologyController.readTechnologies();
    newTech.id = technologies.length + 1;
    technologies.push(newTech);
    if (!technologies) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    await fs.promises.writeFile(
      technologiesFilePath,
      JSON.stringify(technologies, null, 2)
    );
    res.status(201).json(newTech);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Редактирование технологии
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedTech = req.body;
    const technologies = await technologyController.readTechnologies();
    const index = technologies.findIndex((tech) => tech.id === id);

    if (index !== -1) {
      updatedTech.id = id;
      technologies[index] = updatedTech;
      fs.writeFile(
        technologiesFilePath,
        JSON.stringify(technologies, null, 2),
        (err) => {
          if (err) {
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          res.json(updatedTech);
        }
      );
    } else {
      res.status(404).json({ message: "Технология не найдена" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Удаление технологии
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const technologies = await technologyController.readTechnologies();
    const index = technologies.findIndex((tech) => tech.id === id);

    if (index !== -1) {
      technologies.splice(index, 1);
      fs.writeFile(
        technologiesFilePath,
        JSON.stringify(technologies, null, 2),
        (err) => {
          if (err) {
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          res.status(204).send();
        }
      );
    } else {
      res.status(404).json({ message: "Технология не найдена" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
