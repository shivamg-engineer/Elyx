import readline from 'readline';
import PayrollServiceIMPL from '../Services/PayrollServiceIMPL.js';
import { resolve } from 'path';

const rl= readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

const payroll= new PayrollServiceIMPL();

function askQuestion(query){
    return new Promise(resolve => rl.question(query,resolve));
}

async function runPayrollApp() {
    
    while(true){
         console.log(`
Choose an option:
1. Add Employee
2. Calculate Salary
3. Show Salary Slip
4. Search Employee
5. Exit
        `);


        const choice = await askQuestion("Enter your choice (1-5): ");

        switch (choice) {
            case '1': {
                const name = await askQuestion("Enter Name: ");
                const salary = parseFloat(await askQuestion("Enter Base Salary: "));
                payroll.addEmployee(name, salary);
                break;
            }
            case '2': {
                const name = await askQuestion("Enter Employee Name: ");
                payroll.calculateSalary(name);
                break;
            }
            case '3': {
                const name = await askQuestion("Enter Employee Name: ");
                payroll.showSalarySlip(name);
                break;
            }
            case '4': {
                const name = await askQuestion("Enter Employee Name: ");
                payroll.searchEmployee(name);
                break;
            }
            case '5':
                console.log("Exiting Payroll System.");
                rl.close();
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}

runPayrollApp();