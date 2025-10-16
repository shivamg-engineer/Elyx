var Utilities;
(function (Utilities) {
    function logMessage(message) {
        console.log("Log: ".concat(message));
    }
    Utilities.logMessage = logMessage;
    // New function to log errors
    function logError(errorMessage) {
        console.error("Error: ".concat(errorMessage));
    }
    Utilities.logError = logError;
})(Utilities || (Utilities = {}));
// Usage
Utilities.logMessage("Hello, TypeScript Namespace!");
Utilities.logError("Something went wrong!");
