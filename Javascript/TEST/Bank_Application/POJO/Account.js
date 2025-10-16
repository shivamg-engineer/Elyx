class Account {

    #name;
    #balance;
    #transactions;


    constructor(name, initialDeposit) {
        this.#name = name;
        this.#balance = initialDeposit;
        this.#transactions = [`Account created with deposit: ${initialDeposit}`];
    }

    getName() {
        return this.#name;
    }
    deposit(amount) {
        this.#balance += amount;
        this.#transactions.push(`Deposited: ${amount}`);
    }
    withdraw(amount) {
        if (amount > this.#balance) {
            console.log("Insufficient funds.");
            return false;

        }

        this.#balance -= amount;
        this.#transactions.push(`Withdrawn : ${amount}`);
        return true;
    }

    getBalance() {
        return this.#balance;
    }

    getTransactionHistory() {
        return this.#transactions;
    }
}

module.exports = Account;