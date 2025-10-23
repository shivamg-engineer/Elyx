import readline from 'readline';
import CalculatorServiceIMPL from '../Services/CalculatorServiceIMPL.js';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const calculator = new CalculatorServiceIMPL();
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
async function runCalculator() {
    while (true) {
        console.log(`\nChoose Operation:
      1. Addition (+)
      2. Subtraction (-)
      3. Multiplication (*)
      4. Division (/)
      5. Exit`);
        const choice = await askQuestion("Enter your choice (1-5): ");
        if (choice === '5') {
            console.log("Goodbye!");
            break;
        }
        const inputA = await askQuestion("Enter First Number: ");
        const inputB = await askQuestion("Enter Second Number: ");
        const a = parseFloat(inputA);
        const b = parseFloat(inputB);
        if (isNaN(a) || isNaN(b)) {
            console.log("Invalid number input. Please try again.");
            continue;
        }
        try {
            let result;
            switch (choice) {
                case '1':
                    result = calculator.add(a, b);
                    console.log(`Result: ${a} + ${b} = ${result}`);
                    break;
                case '2':
                    result = calculator.subtract(a, b);
                    console.log(`Result: ${a} - ${b} = ${result}`);
                    break;
                case '3':
                    result = calculator.multiply(a, b);
                    console.log(`Result: ${a} * ${b} = ${result}`);
                    break;
                case '4':
                    result = calculator.divide(a, b);
                    console.log(`Result: ${a} / ${b} = ${result}`);
                    break;
                default:
                    console.log("Invalid choice. Please enter 1-5.");
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.log("Error:", err.message);
            }
            else {
                console.log("Unknown error occurred.");
            }
        }
    }
    rl.close();
}
runCalculator();
//# sourceMappingURL=CalculatorTest.js.map