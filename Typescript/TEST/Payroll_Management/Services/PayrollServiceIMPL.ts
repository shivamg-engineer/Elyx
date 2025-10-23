import type {PayrollService} from "./PayrollService";
import Employee from "../Class/Employee";

class PayrollServiceIMPL implements PayrollService {
  private employees: Map<string, Employee>;

  constructor() {
   
    this.employees = new Map<string, Employee>();
  }

  addEmployee(name: string, baseSalary: number): void {
    if (this.employees.has(name)) {
      console.log("Employee already exists");
      return;
    }
    const emp = new Employee(name, baseSalary);
    this.employees.set(name, emp);
    console.log(`Employee ${name} added successfully.`);
  }

  calculateSalary(name: string): number | undefined {
    const emp = this.employees.get(name);
    if (!emp) {
      console.log("Employee not found.");
      return;
    }
    const netSalary = emp.calculateNetSalary();
    console.log(`Net salary for ${name} calculated: $${netSalary.toFixed(2)}`);
  }

  showSalarySlip(name: string): string | undefined {
    const emp = this.employees.get(name);
    if (!emp) {
      console.log("Employee not found.");
      return;
    }
    console.log(emp.getSalarySlip());
  }

  searchEmployee(name: string): Employee | undefined {
    const results = [...this.employees.values()].filter(emp =>
      emp.getName().toLowerCase().includes(name.toLowerCase())
    );
    if (results.length === 0) {
      console.log("No employees found.");
      return undefined;
    } else {
      console.log("Search Results:");
      results.forEach(emp => console.log("- " + emp.getName()));
        return results[0];
    }
  }
}

export default PayrollServiceIMPL;
