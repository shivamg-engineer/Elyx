class Account {
    #pin;
    #balance;
    #transactions; 

    constructor(pin, initialBalance = 0) {
        this.#pin = pin;
        this.#balance = initialBalance;
        this.#transactions = [];
    }

    validatePin(inputPin) {
        return this.#pin === inputPin;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amount) {
        this.#balance += amount;
        this.#transactions.push({ type: 'Deposit', amount, date: new Date() });
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            return false; 
        }
        this.#balance -= amount;
        this.#transactions.push({ type: 'Withdraw', amount, date: new Date() });
        return true;
    }

    getTransactions(startDate, endDate) {
       
        return this.#transactions.filter(tx => {
            return tx.date >= startDate && tx.date <= endDate;
        });
    }

    getAllTransactions() {
        return this.#transactions;
    }
}

export default Account;
