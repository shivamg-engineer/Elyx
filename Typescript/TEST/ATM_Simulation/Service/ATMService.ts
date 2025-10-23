import type {Transaction}  from '../Class/Account';

    
export type ATMService = {
  authenticate(pin: number): boolean;
  checkBalance(): number;
  withdraw(amount: number): number;
  deposit(amount: number): number;
  printMiniStatement(startDate: Date, endDate: Date): Transaction[]; // <-- THIS MUST RETURN Transaction[]
};
