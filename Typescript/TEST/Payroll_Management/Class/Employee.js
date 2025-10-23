class Employee {
    #name;
    #baseSalary;
    #taxRate;
    #netSalary;
    constructor(name, baseSalary) {
        this.#name = name;
        this.#baseSalary = baseSalary;
        this.#taxRate = 0.2;
        this.#netSalary = null;
    }
    getName() {
        return this.#name;
    }
    getBaseSalary() {
        return this.#baseSalary;
    }
    calculateNetSalary() {
        this.#netSalary = this.#baseSalary * (1 - this.#taxRate);
        return this.#netSalary;
    }
    getNetSalary() {
        return this.#netSalary;
    }
    getSalarySlip() {
        if (this.#netSalary === null) {
            return "Salary not calculated yet.";
        }
        return `
Salary Slip:
------------------------------
Employee: ${this.#name}
Base Salary: $${this.#baseSalary.toFixed(2)}
Tax Deduction: ${(this.#taxRate * 100).toFixed(0)}%
Net Salary: $${this.#netSalary.toFixed(2)}
    `;
    }
}
export default Employee;
//# sourceMappingURL=Employee.js.map