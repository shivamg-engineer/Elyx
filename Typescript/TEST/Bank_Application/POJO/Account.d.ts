export default class Account {
    #private;
    constructor(name: string, initialDeposit: number);
    getName(): string;
    deposit(amount: number): void;
    withdraw(amount: number): boolean;
    getBalance(): number;
    getTransactionHistory(): string[];
}
//# sourceMappingURL=Account.d.ts.map