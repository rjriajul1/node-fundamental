const path = require("path");

console.log("current file: \n");
console.log("filename: ", __filename);
console.log("Directory: ", __dirname);

console.log("\n" + "-".repeat(50) + "\n");

const  filePath = "/riajul/documents/nextLevel.pdf";
console.log("analyzing path :", filePath, "\n");

console.log("Directory: ", path.dirname(filePath));
console.log("Base name: ", path.basename(filePath));
console.log("File Eextension: ", path.extname(filePath));
console.log("File name: ", path.basename(filePath, path.extname(filePath)));

console.log("\n" + "-".repeat(50) + "\n");

const parsed = path.parse(filePath)
console.log("parsed paht object: ", parsed);

console.log("\n" + "-".repeat(50) + "\n");

console.log("formated path: ", path.format(parsed));