var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    MathUtils.add = function (a, b) {
        return a + b;
    };
    MathUtils.subtract = function (a, b) {
        return a - b;
    };
    MathUtils.multiply = function (a, b) {
        return a * b;
    };
    MathUtils.divide = function (a, b) {
        return a / b;
    };
    return MathUtils;
}());
console.log(MathUtils.add(4, 5));
