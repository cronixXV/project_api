const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Middleware для проверки токена в заголовке "x-auth-token"
function checkToken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = checkToken;
