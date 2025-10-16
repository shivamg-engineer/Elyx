class Employee{
    #name;
    #basesalary;
     #taxRate;
    #netSalary;

    constructor(name,baseSalary){
        this.#name=name;
        this.#basesalary=baseSalary;
        this.#taxRate=0.2;
        this.#netSalary=null;
    }

    getName(){
        return this.#name;
    }
    getBaseSalary(){
        return this.#basesalary;
    }

    calculateNetSalary(){
        this.#netSalary= this.#basesalary * (1- this.#taxRate);
        return this.#netSalary;
    }
    getNetSalary(){
        return this.#netSalary;
    }

    getSalarySlip(){
        if (this.#netSalary === null) {
            return "Salary not calculated yet.";
        }
        return `
        Salary Slip:
        ------------------------------
        Employee: ${this.#name}
        Base Salary: $${this.#basesalary}
        Tax Deduction: ${this.#taxRate * 100}%
        Net Salary: $${this.#netSalary.toFixed(2)}
        `;
    }
}
export default Employee;