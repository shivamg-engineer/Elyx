import type { LibraryService } from "./LibraryService";
import Book from "../POJO/Book";
declare class LibraryServiceIMPL implements LibraryService {
    private books;
    constructor();
    addBook(title: string): void;
    issueBook(title: string): void;
    returnBook(title: string): void;
    showAvailableBooks(): Book[];
    searchBook(title: string): Book | undefined;
}
export default LibraryServiceIMPL;
//# sourceMappingURL=LibraryServiceIMPL.d.ts.map