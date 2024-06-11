const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user._id }, secret);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Проверяем правильность пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user._id }, secret);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, login };
