const fs = require("fs");
const fileName = "./build/manifest.json";
//
fs.readdir("./build", (err, files) => {
  console.log("contents:");
  files.forEach((file) => {
    console.log(file);
  });
});

const file = require(fileName);

delete file.key;

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
  if (err) return console.log(err);
  console.log("writing to " + fileName);
});
