import type { PayrollService } from "./PayrollService";
import Employee from "../Class/Employee";
declare class PayrollServiceIMPL implements PayrollService {
    private employees;
    constructor();
    addEmployee(name: string, baseSalary: number): void;
    calculateSalary(name: string): number | undefined;
    showSalarySlip(name: string): string | undefined;
    searchEmployee(name: string): Employee | undefined;
}
export default PayrollServiceIMPL;
//# sourceMappingURL=PayrollServiceIMPL.d.ts.map