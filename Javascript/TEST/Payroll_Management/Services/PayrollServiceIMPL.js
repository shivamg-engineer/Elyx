
import PayrollService from "./PayrollService.js";
import Employee from "../Class/Employee.js";
class PayrollServiceIMPL extends PayrollService {

    constructor() {
        super();
        this.employees = new Map();
    }

    addEmployee(name, baseSalary) {
        if (this.employees.has(name)) {
            console.log("Employee already exists");
            return;
        }
        const emp = new Employee(name, baseSalary);
        this.employees.set(name, emp);
        console.log(`Employee ${name} added successfully.`);
    }

    calculateSalary(name) {
        const emp = this.employees.get(name);
        if (!emp) return console.log("Employee not found.");
        const netSalary = emp.calculateNetSalary();
        console.log(`Net salary for ${name} calculated: $${netSalary.toFixed(2)}`);
    }

    showSalarySlip(name) {
        const emp = this.employees.get(name);
        if (!emp) return console.log("Employee not found.");
        console.log(emp.getSalarySlip());
    }

    searchEmployee(name) {
        const results = [...this.employees.values()].filter(emp => [
            emp.getName().toLowerCase().includes(name.toLowerCase())
        ]);
        if (results.length === 0) {
            console.log("No employees found.");
        } else {
            console.log("Search Results:");
            results.forEach(emp => console.log("- " + emp.getName()));
        }
    }
}

export default PayrollServiceIMPL;