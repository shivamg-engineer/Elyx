namespace MathOperations {
    export function add(x: number, y: number): number {
        return x + y;
    }
}

namespace MathOperations {
    export function subtract(x: number, y: number): number {
        return x - y;
    }
}

namespace MathOperations {
    export function multiply(x: number, y: number): number {
        return x * y;
    }
}

console.log(MathOperations.add(5, 3));
console.log(MathOperations.subtract(10, 4));
console.log(MathOperations.multiply(10, 4));