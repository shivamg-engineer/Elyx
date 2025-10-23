export type Transaction = {
    type: 'Deposit' | 'Withdraw';
    amount: number;
    date: Date
}

class Account {
    #pin: number;
    #balance: number;
    #transactions: Transaction[];

    constructor(pin: number, initialBalance = 0) {
        this.#pin = pin;
        this.#balance = initialBalance;
        this.#transactions = [];
    }

    validatePin(inputPin: number): boolean {
        return this.#pin === inputPin;
    }

    getBalance(): number {
        return this.#balance;
    }

    deposit(amount: number): void {
        this.#balance += amount;
        this.#transactions.push({ type: 'Deposit', amount, date: new Date() });
    }

    withdraw(amount: number): boolean {
        if (amount > this.#balance) {
            return false;
        }
        this.#balance -= amount;
        this.#transactions.push({ type: 'Withdraw', amount, date: new Date() });
        return true;
    }

    getTransactions(startDate: Date, endDate: Date): Transaction[] {

        return this.#transactions.filter(tx => {
            return tx.date >= startDate && tx.date <= endDate;
        });
    }

    getAllTransactions(): Transaction[] {
        return this.#transactions;
    }
}

export default Account;
