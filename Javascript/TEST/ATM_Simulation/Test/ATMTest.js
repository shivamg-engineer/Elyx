import readline from 'readline';
import ATMServiceIMPL from '../Service/ATMServiceIMPL.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function parseDate(input) {
    
    const d = new Date(input);
    if (isNaN(d.getTime())) return null;
    return d;
}

async function runATM() {

    const atm = new ATMServiceIMPL('1234', 1000);

    let authenticated = false;
    while (!authenticated) {
        const pinInput = await askQuestion('Enter PIN: ');
        if (atm.authenticate(pinInput)) {
            console.log('Authentication successful!');
            authenticated = true;
        } else {
            console.log('Invalid PIN. Try again.');
        }
    }

    while (true) {
        console.log(`
Choose Operation:
1. Check Balance
2. Withdraw Money
3. Deposit Money
4. Print Mini-Statement
5. Exit
        `);

        const choice = await askQuestion('Enter choice (1-5): ');

        try {
            switch (choice) {
                case '1':
                    const balance = atm.checkBalance();
                    console.log(`Your balance: $${balance.toFixed(2)}`);
                    break;

                case '2':
                    const withdrawAmount = parseFloat(await askQuestion('Enter amount to withdraw: '));
                    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
                        console.log('Invalid amount.');
                        break;
                    }
                    atm.withdraw(withdrawAmount);
                    console.log(`Withdrawn $${withdrawAmount.toFixed(2)}`);
                    break;

                case '3':
                    const depositAmount = parseFloat(await askQuestion('Enter amount to deposit: '));
                    if (isNaN(depositAmount) || depositAmount <= 0) {
                        console.log('Invalid amount.');
                        break;
                    }
                    atm.deposit(depositAmount);
                    console.log(`Deposited $${depositAmount.toFixed(2)}`);
                    break;

                case '4':
                    const startDateStr = await askQuestion('Enter start date (YYYY-MM-DD): ');
                    const endDateStr = await askQuestion('Enter end date (YYYY-MM-DD): ');

                    const startDate = parseDate(startDateStr);
                    const endDate = parseDate(endDateStr);

                    if (!startDate || !endDate) {
                        console.log('Invalid date format.');
                        break;
                    }
                    if (startDate > endDate) {
                        console.log('Start date must be before or equal to end date.');
                        break;
                    }

                    const transactions = atm.printMiniStatement(startDate, endDate);
                    if (transactions.length === 0) {
                        console.log('No transactions in this period.');
                    } else {
                        console.log('Transactions:');
                        transactions.forEach(tx => {
                            console.log(`${tx.date.toLocaleString()} - ${tx.type} - $${tx.amount.toFixed(2)}`);
                        });
                    }
                    break;

                case '5':
                    console.log('Thank you for using the ATM. Goodbye!');
                    rl.close();
                    return;

                default:
                    console.log('Invalid choice.');
            }
        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

runATM();
