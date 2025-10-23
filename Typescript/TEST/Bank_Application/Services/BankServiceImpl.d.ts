import BankService from "./BankService";
declare class BankServiceImpl extends BankService {
    private accounts;
    constructor();
    createAccount(name: string, deposit: number): void;
    deposit(name: string, amount: number): void;
    withdraw(name: string, amount: number): void;
    showBalance(name: string): void;
    showTransactionHistory(name: string): void;
    searchAccount(partialName: string): void;
}
export default BankServiceImpl;
//# sourceMappingURL=BankServiceImpl.d.ts.map