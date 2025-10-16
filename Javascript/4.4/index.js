class Singleton {
    
  constructor(name) {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
    this.name=name;
  }
}

const s1 = new Singleton();
const s2 = new Singleton();

console.log(s1 === s2); // true — both are the same instance

s1.name="shyam";

s2.name="shiva"
console.log(s1.name);
console.log(s1.name);