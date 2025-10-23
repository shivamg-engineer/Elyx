import BankService from "./BankService"; // Assuming BankService is a class or interface
import Account from "../POJO/Account";

class BankServiceImpl extends BankService {
    private accounts: Map<string, Account>;

    constructor() {
        super();
        this.accounts = new Map<string, Account>();
    }

    createAccount(name: string, deposit: number): void {
        if (this.accounts.has(name)) {
            console.log('This account already exists');
            return;
        }

        const account = new Account(name, deposit);
        this.accounts.set(name, account);
        console.log(`Created account for ${name}.`);
    }

    deposit(name: string, amount: number): void {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found");
            return;
        }
        account.deposit(amount);
        console.log(`Deposited ${amount} to ${name}`);
    }

    withdraw(name: string, amount: number): void {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found");
            return;
        }
        const success = account.withdraw(amount);
        if (!success) {
            console.log("Insufficient funds.");
            return;
        }
        console.log(`Withdrawn ${amount} from ${name}`);
    }

    showBalance(name: string): void {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found");
            return;
        }
        console.log(`Balance for ${name}: ${account.getBalance()}`);
    }

    showTransactionHistory(name: string): void {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found.");
            return;
        }
        console.log(`Transactions for ${name}:`);
        account.getTransactionHistory().forEach(tx => console.log("- " + tx));
    }

    searchAccount(partialName: string): void {
        const matches: string[] = [];

        for (const [name] of this.accounts) {
            if (name.toLowerCase().includes(partialName.toLowerCase())) {
                matches.push(name);
            }
        }

        if (matches.length === 0) {
            console.log(`No accounts found matching ${partialName}.`);
        } else {
            console.log(`Accounts matching ${partialName}:`);
            matches.forEach(match => console.log("- " + match));
        }
    }
}

export default BankServiceImpl;
