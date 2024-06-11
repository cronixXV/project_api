const mongoose = require("mongoose");

mongoose.connect("mongodb://root:12345@localhost:27017/project_api", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
