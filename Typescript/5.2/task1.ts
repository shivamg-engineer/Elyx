namespace Utilities {
    export function logMessage(message: string): void {
        console.log(`Log: ${message}`);
    }

    // New function to log errors
    export function logError(errorMessage: string): void {
        console.error(`Error: ${errorMessage}`);
    }
}

// Usage
Utilities.logMessage("Hello, TypeScript Namespace!");
Utilities.logError("Something went wrong!");
