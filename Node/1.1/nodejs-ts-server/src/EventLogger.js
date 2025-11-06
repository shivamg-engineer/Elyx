import { EventEmitter } from "events";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logger = new EventEmitter();
const logFilePath = path.join(__dirname, 'app.log');
logger.on('log', (message) => {
    console.log('Directory:', __dirname);
    console.log('File:', __filename);
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
});
// Test logs
logger.emit('log', 'Server started successfully');
logger.emit('log', 'User logged in: Shivam');
//# sourceMappingURL=EventLogger.js.map