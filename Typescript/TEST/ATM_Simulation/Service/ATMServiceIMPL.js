import Account from '../Class/Account.js';
class ATMServiceIMPL {
    account;
    authenticated;
    constructor(pin, initialBalance = 0) {
        this.account = new Account(pin, initialBalance);
        this.authenticated = false;
    }
    authenticate(pin) {
        this.authenticated = this.account.validatePin(pin);
        return this.authenticated;
    }
    checkBalance() {
        if (!this.authenticated)
            throw new Error("Not authenticated.");
        return this.account.getBalance();
    }
    withdraw(amount) {
        if (!this.authenticated)
            throw new Error("Not authenticated.");
        if (amount <= 0)
            throw new Error("Invalid amount.");
        const success = this.account.withdraw(amount);
        if (!success)
            throw new Error("Insufficient funds.");
        return this.account.getBalance();
    }
    deposit(amount) {
        if (!this.authenticated)
            throw new Error("Not authenticated.");
        if (amount <= 0)
            throw new Error("Invalid amount.");
        this.account.deposit(amount);
        return this.account.getBalance();
    }
    printMiniStatement(startDate, endDate) {
        if (!this.authenticated)
            throw new Error("Not authenticated.");
        return this.account.getTransactions(startDate, endDate);
    }
}
export default ATMServiceIMPL;
//# sourceMappingURL=ATMServiceIMPL.js.map