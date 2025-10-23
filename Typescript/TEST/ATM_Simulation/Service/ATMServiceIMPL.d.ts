import type { ATMService } from './ATMService';
import type { Transaction } from '../Class/Account';
declare class ATMServiceIMPL implements ATMService {
    private account;
    private authenticated;
    constructor(pin: number, initialBalance?: number);
    authenticate(pin: number): boolean;
    checkBalance(): number;
    withdraw(amount: number): number;
    deposit(amount: number): number;
    printMiniStatement(startDate: Date, endDate: Date): Transaction[];
}
export default ATMServiceIMPL;
//# sourceMappingURL=ATMServiceIMPL.d.ts.map