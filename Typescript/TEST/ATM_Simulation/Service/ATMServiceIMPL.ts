import type { ATMService } from './ATMService';
import type { Transaction } from '../Class/Account';


import Account from '../Class/Account';

class ATMServiceIMPL implements ATMService {
    private account: Account;
    private authenticated: boolean;

    constructor(pin: number, initialBalance = 0) {

        this.account = new Account(pin, initialBalance);
        this.authenticated = false;
    }

    authenticate(pin:number):boolean {
        this.authenticated = this.account.validatePin(pin);
        return this.authenticated;
    }

    checkBalance():number {
        if (!this.authenticated) throw new Error("Not authenticated.");
        return this.account.getBalance();
    }

    withdraw(amount:number):number {
        if (!this.authenticated) throw new Error("Not authenticated.");
        if (amount <= 0) throw new Error("Invalid amount.");
        const success = this.account.withdraw(amount);
        if (!success) throw new Error("Insufficient funds.");
        return this.account.getBalance();
    }

    deposit(amount:number):number {
        if (!this.authenticated) throw new Error("Not authenticated.");
        if (amount <= 0) throw new Error("Invalid amount.");
        this.account.deposit(amount);
        return this.account.getBalance();
    }

    printMiniStatement(startDate:Date, endDate:Date):Transaction[] {
        if (!this.authenticated) throw new Error("Not authenticated.");
        return this.account.getTransactions(startDate, endDate);
    }
}

export default ATMServiceIMPL;
