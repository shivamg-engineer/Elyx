

import readline from 'readline';
import CalculatorServiceIMPL from '../Services/CalculatorServiceIMPL.js';



const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout 
});

const calculator = new CalculatorServiceIMPL();

function askQuestion(query){
  return new Promise(resolve => rl.question(query,resolve));
}

async function runCalculator() {
    
    console.log(
        `Choose Operation:
        1. Addition (+)
        2. Subtraction (-)
        3. Multiplication (*)
        4. Division (/)
        `
    );

 
    const choice = await askQuestion("Enter your choice (1-4): ");
    const a = parseFloat(await askQuestion("Enter First Number: "));
    const b = parseFloat(await askQuestion("Enter Second Number: "));


    try{
        let result;

        switch(choice){
            case '1':
                result=calculator.add(a,b);
                console.log(`Result: ${a} + ${b} = ${result}`);
                break;
            case '2':
                 result=calculator.subtract(a,b);
                 console.log(`Result: ${a} - ${b} = ${result}`);
                break;
            case '3': 
             result=calculator.multiply(a,b);
             console.log(`Result: ${a} * ${b} = ${result}`);
               break;
            case '4':
                 result=calculator.divide(a,b);
                 console.log(`Result: ${a} / ${b} = ${result}`);
                break; 
            default:
                console.log("Invalid choice."); 
        }

    }catch(err){
      console.log("Error :",err.message);
    }

    rl.close();
}

runCalculator();