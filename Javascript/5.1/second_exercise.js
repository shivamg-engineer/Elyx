//     Exercise 2: Object Destructuring
// Given an object with title, author, and year, extract only title and year using destructuring.
// Modify the extracted values and verify if the original object changes.

class Book{
    constructor(title, author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
}
const newBook= new Book("science","john","2025");
const title=newBook.title;
const year=newBook.year;
console.log(title,year);