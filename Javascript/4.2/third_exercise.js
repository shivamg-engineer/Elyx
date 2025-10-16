class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;

    }
      introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old.`;
  }

}
class Employee extends Person {
    constructor(name, age, jobTitle) {
        super(name, age);
        this.jobTitle = jobTitle;

    }
     introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I work as a ${this.jobTitle}.`;
  }
}