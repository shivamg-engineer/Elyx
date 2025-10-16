// Exercise 1: Create a Utility Namespace

// TODO: Define a Utilities namespace containing functions for logging, error handling, and formatting strings.

namespace Utilities {
  // Logs a general message
  export function log(message: string): void {
    console.log(`Log: ${message}`);
  }

  // Logs an error message
  export function error(message: string): void {
    console.error(`Error: ${message}`);
  }

  // Formats a string by capitalizing the first letter
  export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// ✅ Usage
Utilities.log("This is a log message.");
Utilities.error("Something went wrong!");
console.log(Utilities.capitalize("hello world"));  // Output: "Hello world"
