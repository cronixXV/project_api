require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const technologiesRouter = require("./routes/technologies");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middlewares/authMiddleware");
const passport = require("passport");
const projectsRouter = require("./routes/projects"); // Добавил импорт projectsRouter
// const cors = require("cors");

app.use(express.json());
// app.use(cors()); // разрешить всем доменам
app.use(passport.initialize());

// Middleware для проверки авторизации пользователя
const checkToken = authMiddleware;

// Подключение к базе данных MongoDB с использованием аутентификации администратора
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
  {}
);

// Маршрутизация для авторизации
app.use("/api/auth", authRouter);

// Проверка подключения к базе данных
const db = mongoose.connection;
db.on("error", console.error.bind(console, "ошибка подключения к базе данных"));
db.once("open", () => {
  console.log("Подключение к базе данных успешно");
});

// Маршрутизация для технологий
app.use("/technologies", technologiesRouter);

// Маршрутизация для проектов с применением middleware для проверки токена
app.use("/projects", checkToken, projectsRouter);

// Настройка статического файлового сервера
app.use(express.static("public"));

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
