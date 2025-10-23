class Logger {
    static log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
    
    static error(message: string): void {
        console.error(`[ERROR]: ${message}`);
    }
}

Logger.log("Application started");
Logger.error("An unexpected error occurred");
