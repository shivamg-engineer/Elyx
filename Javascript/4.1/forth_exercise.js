// 4. Implement Composition Instead of Inheritance
const eater= {eat:()=> console.log("Eating...")};
const barker= {bark:()=> console.log("Woof...")};

const dog= Object.assign({},eater,barker);
dog.eat();
dog.bark();