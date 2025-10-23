import type { CalculatorService } from './CalculatorService';

class CalculatorServiceIMPL implements CalculatorService {
    add(firstN: number, secondN: number): number {
        return firstN + secondN;
    }

    subtract(firstN: number, secondN: number): number {
        return firstN - secondN;
    }

    multiply(firstN: number, secondN: number): number {
        return firstN * secondN;
    }

    divide(firstN: number, secondN: number): number {
        if (secondN === 0) throw new Error("Cannot divide by zero.");
        return firstN / secondN;
    }
}

export default CalculatorServiceIMPL;
