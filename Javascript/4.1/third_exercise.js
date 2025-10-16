class Animal{
 
    makeSound(){
        console.log("");
    }
}
class Dog extends Animal{
 makeSound(){
        console.log("Bark");
    }

}

const pet = new Dog();
pet.makeSound(); // "Bark!"
