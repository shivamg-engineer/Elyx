var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (str) {
        console.log("".concat(new Date(), " : ").concat(str));
    };
    return Logger;
}());
Logger.log("Hello typescript");
