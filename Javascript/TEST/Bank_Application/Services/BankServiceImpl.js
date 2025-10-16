const BankService = require("./BankService.js");
const Account = require("../POJO/Account.js");

class BankServiceImpl extends BankService {

    constructor() {
        super();
        this.accounts = new Map();

    }

    createAccount(name, deposit, type) {
        if (this.accounts.has(name)) {
            console.log('this account is already exists');
            return;
        }

        let account = new Account(name, deposit);

        this.accounts.set(name, account);
        console.log(`Created ${type} account for ${name}.`);
    }
    deposit(name, amount) {
        const account = this.accounts.get(name);
        if (!account) return console.log("account not found");

        account.deposit(amount);
        console.log(`Depositd ${amount} to ${name}`);
    }
    withdraw(name, amount) {
        const account = this.accounts.get(name);
        if (!account) return console.log("account not found");
        account.withdraw(amount);
        console.log(`Withdrawn ${amount}`);

    }
    showBalance(name) {
        const account = this.accounts.get(name);

        if (!account) return console.log("account not found");
        console.log(`Balance for ${name}: ${account.getBalance()}`);
    }

    showTransactionHistory(name) {
          const account = this.accounts.get(name);
        if (!account) return console.log("Account not found.");
        console.log(`Transactions for ${name}:`);
        account.getTransactionHistory().forEach(tx => console.log("- " + tx));

    }
    searchAccount(partialName) {
        const matches=[];

        for(const [name, account]of this.accounts){
            if(name.toLowerCase().includes(partialName.toLowerCase())){
                matches.push(name);
            }
        }

        if(matches.length===0){
            console.log(`No accounts found matching ${partialName}.`);
        }else{
            console.log(`accounts matching  ${partialName}`);
            matches.forEach(match=> console.log("- "+match));
        }
    }
}

module.exports = BankServiceImpl;