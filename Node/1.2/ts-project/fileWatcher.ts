import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watchDir = path.join(__dirname, '../watched')

// Ensure directory exists
if (!fs.existsSync(watchDir)) {
  fs.mkdirSync(watchDir)
  console.log(`Created directory: ${watchDir}`)
}

console.log(`Watching for changes in: ${watchDir}\n`)

fs.watch(watchDir, (eventType, filename) => {
  const time = new Date().toLocaleTimeString()
  if (filename) {
    console.log(`[${time}] File ${filename} was ${eventType}`)
  } else {
    console.log(`[${time}] Change detected but filename not provided`)
  }
})
