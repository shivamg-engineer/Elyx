import Book from '../POJO/Book';

export interface LibraryService {
  addBook(title: string): void;
  issueBook(title: string): void;
  returnBook(title: string): void;
  showAvailableBooks(): Book[];
  searchBook(title: string): Book | undefined;
}

