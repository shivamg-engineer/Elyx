// Modify the Logger to include timestamps for logs.

import fs from "fs";
import path from "path";

class Logger {
  private logFile: string;
  constructor(fileName = "app.log") {
    this.logFile = path.resolve(fileName);
  }
//helper method to generate timestamps
private getTimestamp():string{
    const now= new Date();
    const date= now.toISOString().replace('T',' ').split('.')[0];// e.g. "2025-10-28 14:30:12"
    return `[${date}]`;
}


//  Info logs
    info(message: string): void {
        const log = `${this.getTimestamp()} INFO: ${message}`;
        console.log(log);
        fs.appendFileSync(this.logFile, log + '\n', 'utf-8');
    }

    //  Warning logs
    warn(message: string): void {
        const log = `${this.getTimestamp()} WARN: ${message}`;
        console.warn(log);
        fs.appendFileSync(this.logFile, log + '\n', 'utf-8');
    }

    //  Error logs
    error(message: string): void {
        const log = `${this.getTimestamp()} ERROR: ${message}`;
        console.error(log);
        fs.appendFileSync(this.logFile, log + '\n', 'utf-8');
    }
}

const logger = new Logger('activity.log');

logger.info('Server started');
setTimeout(() => logger.warn('Memory usage is high'), 1000);
setTimeout(() => logger.error('Database connection failed'), 2000);