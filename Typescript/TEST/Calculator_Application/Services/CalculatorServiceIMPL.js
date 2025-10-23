class CalculatorServiceIMPL {
    add(firstN, secondN) {
        return firstN + secondN;
    }
    subtract(firstN, secondN) {
        return firstN - secondN;
    }
    multiply(firstN, secondN) {
        return firstN * secondN;
    }
    divide(firstN, secondN) {
        if (secondN === 0)
            throw new Error("Cannot divide by zero.");
        return firstN / secondN;
    }
}
export default CalculatorServiceIMPL;
//# sourceMappingURL=CalculatorServiceIMPL.js.map