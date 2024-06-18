const fs = require("fs");
const path = require("path");

const technologiesFilePath = path.join(
  __dirname,
  "..",
  "data",
  "technologies.json"
);

function readTechnologies() {
  return new Promise((resolve, reject) => {
    fs.readFile(technologiesFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const technologies = JSON.parse(data);
        resolve(technologies);
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  readTechnologies,
};
