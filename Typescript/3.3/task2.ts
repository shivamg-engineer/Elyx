// Challenge: Add another class Bird and modify the function accordingly.
class Dog {
  bark() { console.log("Woof!"); }
}
class Cat {
  meow() { console.log("Meow!"); }
}
class Bird{
    fly(){console.log("flyingg");}
}

function makeSound(animal: Dog | Cat | Bird) {
  if (animal instanceof Dog) {
    animal.bark();
  } else if(animal instanceof Cat){
    animal.meow();
  }else{
    animal.fly();
  }
}
