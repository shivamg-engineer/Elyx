var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (message) {
        console.log("[LOG]: ".concat(message));
    };
    Logger.error = function (message) {
        console.error("[ERROR]: ".concat(message));
    };
    return Logger;
}());
Logger.log("Application started");
Logger.error("An unexpected error occurred");
