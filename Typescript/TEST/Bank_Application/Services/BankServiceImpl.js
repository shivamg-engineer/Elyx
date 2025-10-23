import BankService from "./BankService.js"; // Assuming BankService is a class or interface
import Account from "../POJO/Account.js";
class BankServiceImpl extends BankService {
    accounts;
    constructor() {
        super();
        this.accounts = new Map();
    }
    createAccount(name, deposit) {
        if (this.accounts.has(name)) {
            console.log('This account already exists');
            return;
        }
        const account = new Account(name, deposit);
        this.accounts.set(name, account);
        console.log(`Created account for ${name}.`);
    }
    deposit(name, amount) {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found");
            return;
        }
        account.deposit(amount);
        console.log(`Deposited ${amount} to ${name}`);
    }
    withdraw(name, amount) {
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
    showBalance(name) {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found");
            return;
        }
        console.log(`Balance for ${name}: ${account.getBalance()}`);
    }
    showTransactionHistory(name) {
        const account = this.accounts.get(name);
        if (!account) {
            console.log("Account not found.");
            return;
        }
        console.log(`Transactions for ${name}:`);
        account.getTransactionHistory().forEach(tx => console.log("- " + tx));
    }
    searchAccount(partialName) {
        const matches = [];
        for (const [name] of this.accounts) {
            if (name.toLowerCase().includes(partialName.toLowerCase())) {
                matches.push(name);
            }
        }
        if (matches.length === 0) {
            console.log(`No accounts found matching ${partialName}.`);
        }
        else {
            console.log(`Accounts matching ${partialName}:`);
            matches.forEach(match => console.log("- " + match));
        }
    }
}
export default BankServiceImpl;
//# sourceMappingURL=BankServiceImpl.js.map