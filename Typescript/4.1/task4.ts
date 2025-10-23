class Employee {
    name: string;
    role: string;
    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
    }
}

class Manager extends Employee {

    department: string;
    teamSize: number;

    constructor(name: string, role: string, department: string, teamSize: number) {
        super(name, role);
        this.department = department;
        this.teamSize = teamSize;
    }
    displayTeamSize() {
        console.log(`${this.name} manages a team of ${this.teamSize} people.`);
    }
}

const mgr = new Manager("Rahul", "Tech Lead", "Engineering", 10);
console.log(mgr);
mgr.displayTeamSize();