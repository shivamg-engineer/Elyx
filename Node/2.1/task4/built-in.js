const fs = require("fs");
const os = require("os");

console.log(`System Platform: ${os.platform()}`);
fs.writeFileSync("test.txt", "Hello, Node.js!"); //fs.writeFileSync(path, data) —

console.log(fs.readFileSync("test.txt").toString());

// Read the contents of the file
const data = fs.readFileSync("test.txt", "utf8"); //reads the file’s content synchronously.

// Print the contents to the console
console.log(data);
