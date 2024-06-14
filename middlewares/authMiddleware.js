const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function checkToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];
  console.log("Token received: ", token);

  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token decoded: ", decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    console.error("Error verifying token: ", ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = checkToken;
