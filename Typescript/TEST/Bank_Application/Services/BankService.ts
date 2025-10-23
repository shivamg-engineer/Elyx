
export default class BankService {
    createAccount(name:string, deposit:number) {
        throw new Error("Method 'createAccount()' must be implemented.");
    }

    deposit(name:string, amount:number) {
        throw new Error("Method 'deposit()' must be implemented.");
    }

    withdraw(name:string, amount:number) {
        throw new Error("Method 'withdraw()' must be implemented.");
    }

    showBalance(name:string) {
        throw new Error("Method 'showBalance()' must be implemented.");
    }

    showTransactionHistory(name:string) {
        throw new Error("Method 'showTransactionHistory()' must be implemented.");
    }

    searchAccount(partialName:string) {
        throw new Error("Method 'searchAccount()' must be implemented.");
    }
}

