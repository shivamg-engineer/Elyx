class Book {
  #title: string;
  #isIssued: boolean;

  constructor(title: string, isIssued: boolean = false) {
    this.#title = title;
    this.#isIssued = isIssued;
  }

  getTitle(): string {
    return this.#title;
  }

  isAvailable(): boolean {
    return !this.#isIssued;
  }

  issue(): boolean {
    if (this.#isIssued) return false;
    this.#isIssued = true;
    return true;
  }

  returnBook(): boolean {
    if (!this.#isIssued) return false;
    this.#isIssued = false;
    return true;
  }
}

export default Book;
