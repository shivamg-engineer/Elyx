class BankAccount {
    #balance

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    deposit(amount) {
     this.#balance+=amount;
    }
    withdraw(amount){
        if(this.#balance<amount){
            throw new Error("cannot withdraw more than your account balance");
        }
     this.#balance-=amount;
    }

    getBalance(){
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(300);
console.log(account.getBalance()); // Expected: 1200
account.withdraw(2000); // Should print "Insufficient funds"

