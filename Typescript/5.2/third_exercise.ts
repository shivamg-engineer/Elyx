namespace MathOperations {
  export function addition(a: number, b: number): number {
    return a + b;
  }

  export function subtraction(a: number, b: number): number {
    return a - b;
  }
}

namespace MathOperations {
  export function divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }

  export function modulus(a: number, b: number): number {
    return a % b;
  }
}
console.log(MathOperations.addition(10, 5));       // 15
console.log(MathOperations.subtraction(10, 5));  // 5
console.log(MathOperations.divide(10, 2));    // 5
console.log(MathOperations.modulus(10, 3));   // 1
