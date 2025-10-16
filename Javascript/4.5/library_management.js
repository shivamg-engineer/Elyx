class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.isAvailable = true;
  }
  borrowBook() {
    if (this.isAvailable) {
      this.isAvailable = false;
      return "Book borrowed successfully";
    } else {
      return "Book is currently unavailable";
    }
  }
  returnBook() {
    this.isAvailable = true;
    return "Book returned successfully";
  }
}

class Member {
  constructor(name, memberId) {
    this.name = name;
    this.memberId = memberId;
    this.borrowedBooks = [];
  }
  borrow(book) {
    if (book.isAvailable) {
      this.borrowedBooks.push(book);
      return book.borrowBook();
    }
    return "Book not available";
  }
  return(book) {
    this.borrowedBooks = this.borrowedBooks.filter(b => b.ISBN !== book.ISBN);
    return book.returnBook();
  }
}

const spring= new Book("Spring","shivam","Esbn");
const Sandy=new Member("Sandy","bkl");

console.log(Sandy.borrow(spring)); 
console.log(`${Sandy.name} borrowed ${Sandy.borrowedBooks.map(b=>b.title).join(', ')}`);

console.log(Sandy.return(spring));
console.log(`${Sandy.name} borrowed: ${Sandy.borrowedBooks.length === 0 ? "No books borrowed" : Sandy.borrowedBooks.map(b => b.title).join(', ')}`);