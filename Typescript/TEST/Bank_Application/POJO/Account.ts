export default class Account {

    #name:string;
    #balance:number;
    #transactions:string[];


    constructor(name:string, initialDeposit:number) {
        this.#name = name;
        this.#balance = initialDeposit;
        this.#transactions = [`Account created with deposit: ${initialDeposit}`];
    }

    getName():string {
        return this.#name;
    }
    deposit(amount:number):void {
        this.#balance += amount;
        this.#transactions.push(`Deposited: ${amount}`);
    }
    withdraw(amount:number):boolean {
        if (amount > this.#balance) {
            console.log("Insufficient funds.");
            return false;

        }

        this.#balance -= amount;
        this.#transactions.push(`Withdrawn : ${amount}`);
        return true;
    }

    getBalance():number {
        return this.#balance;
    }

    getTransactionHistory():string[] {
        return this.#transactions;
    }
}

