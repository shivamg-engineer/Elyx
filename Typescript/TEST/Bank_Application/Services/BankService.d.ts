export default class BankService {
    createAccount(name: string, deposit: number): void;
    deposit(name: string, amount: number): void;
    withdraw(name: string, amount: number): void;
    showBalance(name: string): void;
    showTransactionHistory(name: string): void;
    searchAccount(partialName: string): void;
}
//# sourceMappingURL=BankService.d.ts.map