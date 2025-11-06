import fs from "fs";
import path from "path";

//file path to watch (you can also take it from CLI arguments)
const filePath=path.join('.','watchedFile.txt');

if (!fs.existsSync(filePath)) {
  console.error(` File does not exist: ${filePath}`);
  process.exit(1);
}

console.log(` Watching for changes in: ${filePath}`);

const watcher = fs.watch(filePath, (eventType, filename) => {
  if (eventType === "change") {
    console.log(`File "${filename}" was modified at ${new Date().toLocaleTimeString()}`);
  } else if (eventType === "rename") {
    console.log(`File "${filename}" was renamed, deleted, or moved.`);
  }
});

watcher.on("error", (err) => {
  console.error("Watcher error:", err);
});
