"use strict";
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
    }
    getAge() {
        return this.age;
    }
}
const user = new User("Alice", 25); // Error!
console.log(user.getAge());
