var MathOperations;
(function (MathOperations) {
    function addition(a, b) {
        return a + b;
    }
    MathOperations.addition = addition;
    function subtraction(a, b) {
        return a - b;
    }
    MathOperations.subtraction = subtraction;
})(MathOperations || (MathOperations = {}));
(function (MathOperations) {
    function divide(a, b) {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
    MathOperations.divide = divide;
    function modulus(a, b) {
        return a % b;
    }
    MathOperations.modulus = modulus;
})(MathOperations || (MathOperations = {}));
console.log(MathOperations.addition(10, 5)); // 15
console.log(MathOperations.subtraction(10, 5)); // 5
console.log(MathOperations.divide(10, 2)); // 5
console.log(MathOperations.modulus(10, 3)); // 1
