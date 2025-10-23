declare class Book {
    #private;
    constructor(title: string, isIssued?: boolean);
    getTitle(): string;
    isAvailable(): boolean;
    issue(): boolean;
    returnBook(): boolean;
}
export default Book;
//# sourceMappingURL=Book.d.ts.map