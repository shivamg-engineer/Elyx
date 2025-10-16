class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Hi, my name is ${this.name}.`);
    }
}

class Employee extends Person {

    constructor(name, jobTitle) {
        super(name);
        this.jobTitle = jobTitle;
    }
    work() {
       console.log(`${this.name} is working as a ${this.jobTitle}`);
    }
}

class Manager extends Employee {
    constructor(name,jobTitle,teamSize){
        super(name,jobTitle);
        this.jobTitle=jobTitle;
    }
    leadTeam(){
        console.log(`${this.name} is leading a  team  of ${this.teamSize} people.`);
    }
}


const person = new Person("Alice");
person.introduce();

const employee = new Employee("Bob", "Developer");
employee.introduce();
employee.work(); 

const manager= new Manager("Charlie","Team lead", 5);
manager.introduce();
manager.work();
manager.leadTeam();