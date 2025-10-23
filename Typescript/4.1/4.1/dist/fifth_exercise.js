"use strict";
// Implement a Library system with Book and Member classes.
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    title;
    author;
    isAvailable;
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true;
    }
    borrow() {
        if (this.isAvailable) {
            this.isAvailable = false;
            console.log(`"${this.title}" has been borrowed.`);
        }
        else {
            console.log(`Sorry, "${this.title}" is not available right now.`);
        }
    }
    returnBook() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            console.log(`"${this.title}" has been returned.`);
        }
        else {
            console.log(`"${this.title}" was not borrowed.`);
        }
    }
}
class Member {
    name;
    borrowedBooks;
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }
    borrowBook(book) {
        if (book.isAvailable) {
            book.borrow();
            this.borrowedBooks.push(book);
            console.log(`${this.name} borrowed "${book.title}".`);
        }
        else {
            console.log(`${this.name} cannot borrow "${book.title}" because it’s unavailable.`);
        }
    }
    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.returnBook();
            this.borrowedBooks.splice(index, 1);
            console.log(`${this.name} returned "${book.title}".`);
        }
        else {
            console.log(`${this.name} does not have "${book.title}".`);
        }
    }
    showBorrowedBooks() {
        if (this.borrowedBooks.length === 0) {
            console.log(`${this.name} has no borrowed books.`);
        }
        else {
            console.log(`${this.name}'s borrowed books:`);
            this.borrowedBooks.forEach((book) => console.log(`- ${book.title} by ${book.author}`));
        }
    }
}
const book1 = new Book("The Alchemist", "Paulo Coelho");
const book2 = new Book("1984", "George Orwell");
const member1 = new Member("Shivam");
member1.borrowBook(book1);
member1.borrowBook(book2);
member1.showBorrowedBooks();
member1.returnBook(book1);
member1.showBorrowedBooks();
member1.borrowBook(book1);
//# sourceMappingURL=fifth_exercise.js.map