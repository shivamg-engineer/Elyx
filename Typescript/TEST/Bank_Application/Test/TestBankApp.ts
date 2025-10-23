import readline from 'readline';

import BankServiceImpl from '../Services/BankServiceImpl';

const bankService = new BankServiceImpl();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log(`
Choose an option:
1. Create Account
2. Deposit Money
3. Withdraw Money
4. Check Balance
5. View Transaction History
6. Search Accounts by Name
7. Exit
`);

    rl.question("enter your choice (1-7: )", choice => {

        switch (choice.trim()) {
            case '1':
                createAccount();
                break;
            case '2':
                depositMoney();
                break;
            case '3':
                withdrawMoney();
                break;
            case '4':
                checkBalance();
                break;
            case '5':
                viewTransactionHistory();
                break;
            case '6':
                searchAccounts();
                break;
            case '7':
                console.log("Exiting... Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Try again.");
                mainMenu();
        }
    });

}

function createAccount(){
    rl.question("Enter account name: ", name=>{
         rl.question("Enter initial deposit", depositStr=>{
            const deposit= parseFloat(depositStr);
            if(isNaN(deposit) || deposit<0){
                 console.log("Invalid deposit amount.");
                return mainMenu();
            }
            bankService.createAccount(name.trim(),deposit);
            mainMenu();
         });
    });
}

function depositMoney(){
    rl.question("Enter account name: ", name=>{
        rl.question("Enter deposit amount:",amountStr=>{
            const amount= parseFloat(amountStr);
            if(isNaN(amount) || amount<=0){
                 console.log("Invalid amount.");
                return mainMenu();
            }
            bankService.deposit(name.trim(), amount);
            mainMenu();
        })
    })
}
function withdrawMoney() {
    rl.question("Enter account name: ", name => {
        rl.question("Enter withdrawal amount: ", amountStr => {
            const amount = parseFloat(amountStr);
            if (isNaN(amount) || amount <= 0) {
                console.log("Invalid amount.");
                return mainMenu();
            }
            bankService.withdraw(name.trim(), amount);
            mainMenu();
        });
    });
}

function checkBalance() {
    rl.question("Enter account name: ", name => {
        bankService.showBalance(name.trim());
        mainMenu();
    });
}

function viewTransactionHistory() {
    rl.question("Enter account name: ", name => {
        bankService.showTransactionHistory(name.trim());
        mainMenu();
    });
}

function searchAccounts() {
    rl.question("Enter search keyword: ", keyword => {
        bankService.searchAccount(keyword.trim());
        mainMenu();
    });
}

console.log("=== Welcome to the Bank Application ===");
mainMenu();