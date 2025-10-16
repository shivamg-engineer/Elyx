// Exercise 4: Object Methods

// Create an object representing a user with a method greet that logs a greeting using this.name.
// Call the method and print the output.
// Modify this.name and call the method again.

const user={
    name:"Alice",
    greet(name){
        console.log(`Hello, ${this.name}`);
    }
};

user.greet();

user.name="Bob";

user.greet();