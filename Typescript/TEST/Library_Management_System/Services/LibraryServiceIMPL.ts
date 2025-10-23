import type { LibraryService } from "./LibraryService";
import Book from "../POJO/Book";

class LibraryServiceIMPL implements LibraryService {
    private books: Map<string, Book>;

    constructor() {
        this.books = new Map<string, Book>();
    }

    addBook(title: string): void {
        if (this.books.has(title)) {
            console.log(`Book ${title} already exists.`);
            return;
        }
        const book = new Book(title);  // only title, isIssued defaults to false
        this.books.set(title, book);   // correct .set() usage
        console.log(`Book "${title}" added.`);
    }

    issueBook(title: string): void {
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

    returnBook(title: string): void {
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

    showAvailableBooks(): Book[] {
        const available = [...this.books.values()].filter(book => book.isAvailable());

        if (available.length === 0) {
            console.log("No books available.");
        } else {
            console.log("Available Books:");
            available.forEach(book => console.log("- " + book.getTitle()));
        }
        return available;


    }

    searchBook(title: string): Book|undefined {
        const search = [...this.books.values()].filter(book =>
            book.getTitle().toLowerCase().includes(title.toLowerCase())
        );
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
