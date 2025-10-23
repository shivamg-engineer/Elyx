class Employee {
  #name: string;
  #baseSalary: number;
  #taxRate: number;
  #netSalary: number | null;

  constructor(name: string, baseSalary: number) {
    this.#name = name;
    this.#baseSalary = baseSalary;
    this.#taxRate = 0.2;
    this.#netSalary = null;
  }

  getName(): string {
    return this.#name;
  }

  getBaseSalary(): number {
    return this.#baseSalary;
  }

  calculateNetSalary(): number {
    this.#netSalary = this.#baseSalary * (1 - this.#taxRate);
    return this.#netSalary;
  }

  getNetSalary(): number | null {
    return this.#netSalary;
  }

  getSalarySlip(): string {
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
