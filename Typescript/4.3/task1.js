var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.circleArea = function (radius) {
        return this.PI * radius * radius;
    };
    Utility.PI = 3.14;
    return Utility;
}());
console.log(Utility.PI); // Accessing static property
console.log(Utility.circleArea(5)); // Calling static method
