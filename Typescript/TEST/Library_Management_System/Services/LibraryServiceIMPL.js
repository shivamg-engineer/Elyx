import Book from "../POJO/Book.js";
class LibraryServiceIMPL {
    books;
    constructor() {
        this.books = new Map();
    }
    addBook(title) {
        if (this.books.has(title)) {
            console.log(`Book ${title} already exists.`);
            return;
        }
        const book = new Book(title); // only title, isIssued defaults to false
        this.books.set(title, book); // correct .set() usage
        console.log(`Book "${title}" added.`);
    }
    issueBook(title) {
        const book = this.books.get(title);
        if (!book) {
            console.log(`Book ${title} not found!!`);
            return;
        }
        if (!book.isAvailable()) {
            console.log(`Book ${title} is already issued.`);
            return;
        }
        book.issue();
        console.log(`Book "${title}" has been issued.`);
    }
    returnBook(title) {
        const book = this.books.get(title);
        if (!book) {
            console.log(`Book ${title} not found!!`);
            return;
        }
        if (book.isAvailable()) {
            console.log(`Book ${title} was not issued.`);
            return;
        }
        book.returnBook();
        console.log(`Book ${title} has been returned.`);
    }
    showAvailableBooks() {
        const available = [...this.books.values()].filter(book => book.isAvailable());
        if (available.length === 0) {
            console.log("No books available.");
        }
        else {
            console.log("Available Books:");
            available.forEach(book => console.log("- " + book.getTitle()));
        }
        return available;
    }
    searchBook(title) {
        const search = [...this.books.values()].filter(book => book.getTitle().toLowerCase().includes(title.toLowerCase()));
        if (search.length === 0) {
            console.log("No books available.");
            return;
        }
        console.log("Search Results:");
        search.forEach(book => {
            console.log(`- ${book.getTitle()} (${book.isAvailable() ? "Available" : "Issued"})`);
        });
    }
}
export default LibraryServiceIMPL;
//# sourceMappingURL=LibraryServiceIMPL.js.map