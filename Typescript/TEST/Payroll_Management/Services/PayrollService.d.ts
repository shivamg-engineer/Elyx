import Employee from '../Class/Employee';
export interface PayrollService {
    addEmployee(name: string, baseSalary: number): void;
    calculateSalary(name: string): number | undefined;
    showSalarySlip(name: string): string | undefined;
    searchEmployee(name: string): Employee | undefined;
}
//# sourceMappingURL=PayrollService.d.ts.map