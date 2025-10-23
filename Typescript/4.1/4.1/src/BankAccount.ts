class BankAccount {
    owner: string;
    balance: number;
    constructor(owner: string, balance: number = 0) {
        this.owner = owner;
        this.balance = balance;
    }

    deposit(amount:number):void{
        if(amount>0){
            this.balance+=amount;
            console.log(`Deposited $${amount}. New balance : $${this.balance}`);
        }else{
            console.log("Deposit amount must be positive.");
        }
    }

    withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdrawal amount must be positive.");
    } else if (amount > this.balance) {
      console.log("Insufficient balance.");
    } else {
      this.balance -= amount;
      console.log(`Withdrew ₹${amount}. New balance: ₹${this.balance}`);
    }
  }
}

const account = new BankAccount("Shivam", 1000);
account.deposit(500);
account.withdraw(300);
account.withdraw(1500);