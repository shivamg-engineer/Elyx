import readline from 'readline';
import LibraryServiceIMPL from '../Services/LibraryServiceIMPL.js';
import { resolve } from 'path';



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const library = new LibraryServiceIMPL();
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
async function runLibraryApp() {
    while (true) {
        console.log(`
Choose an option:
1. Add Book
2. Issue Book
3. Return Book
4. Show Available Books
5. Search Book by Title
6. Exit
        `);

        const choice = await askQuestion("Enter your choice (1-6): ");

        switch (choice) {
            case '1': {
                const title = await askQuestion("Enter Book Name: ");
                library.addBook(title);
                break;
            }
            case '2': {
                const title = await askQuestion("Enter Book Name: ");
                library.issueBook(title);
                break;
            }
            case '3': {
                const title = await askQuestion("Enter Book Name: ");
                library.returnBook(title);
                break;
            }
            case '4':
                library.showAvailableBooks();
                break;
            case '5': {
                const title = await askQuestion("Enter Book Name: ");
                library.searchBook(title);
                break;
            }
            case '6':
                console.log("Exiting Library System.");
                rl.close();
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}

runLibraryApp();

