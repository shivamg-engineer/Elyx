export type Transaction = {
    type: 'Deposit' | 'Withdraw';
    amount: number;
    date: Date;
};
declare class Account {
    #private;
    constructor(pin: number, initialBalance?: number);
    validatePin(inputPin: number): boolean;
    getBalance(): number;
    deposit(amount: number): void;
    withdraw(amount: number): boolean;
    getTransactions(startDate: Date, endDate: Date): Transaction[];
    getAllTransactions(): Transaction[];
}
export default Account;
//# sourceMappingURL=Account.d.ts.map