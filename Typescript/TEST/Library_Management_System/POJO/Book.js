class Book {
    #title;
    #isIssued;
    constructor(title, isIssued = false) {
        this.#title = title;
        this.#isIssued = isIssued;
    }
    getTitle() {
        return this.#title;
    }
    isAvailable() {
        return !this.#isIssued;
    }
    issue() {
        if (this.#isIssued)
            return false;
        this.#isIssued = true;
        return true;
    }
    returnBook() {
        if (!this.#isIssued)
            return false;
        this.#isIssued = false;
        return true;
    }
}
export default Book;
//# sourceMappingURL=Book.js.map