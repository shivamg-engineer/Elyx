var MathOperations;
(function (MathOperations) {
    function add(x, y) {
        return x + y;
    }
    MathOperations.add = add;
})(MathOperations || (MathOperations = {}));
(function (MathOperations) {
    function subtract(x, y) {
        return x - y;
    }
    MathOperations.subtract = subtract;
})(MathOperations || (MathOperations = {}));
(function (MathOperations) {
    function multiply(x, y) {
        return x * y;
    }
    MathOperations.multiply = multiply;
})(MathOperations || (MathOperations = {}));
console.log(MathOperations.add(5, 3));
console.log(MathOperations.subtract(10, 4));
console.log(MathOperations.multiply(10, 4));
