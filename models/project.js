const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stack: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

let currentId = 0;

projectSchema.pre("save", async function (next) {
  if (!this.id) {
    const maxId = await Project.maxId();
    this.id = maxId + 1;
  }
  next();
});

projectSchema.statics.maxId = async function () {
  const maxProject = await this.findOne().sort({ id: -1 });
  return maxProject ? maxProject.id : 0;
};

module.exports = mongoose.model("Project", projectSchema);
