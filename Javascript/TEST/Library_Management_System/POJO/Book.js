class Book{
    #title;
    #isIssued;

    constructor(title,isIssued){
        this.#title=title;
        this.#isIssued-isIssued;
    }

    getTitle(){
        return this.#title;
    }
    isAvailable(title){
    return !this.#isIssued;
    }

    issue(){
         if (this.#isIssued) return false;  
         this.#isIssued = true;
        return true;
    }
     returnBook() {
        if (!this.#isIssued) return false;
        this.#isIssued = false;
        return true;
    }
}

export default Book;