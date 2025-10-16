class Animal{
    speak(){
        console.log("Some generic sound");
    }
}

class Dog extends Animal{
speak(){
        console.log("Bark!");
    }
}


class Cat extends Animal{
speak(){
        console.log("Meow!");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.speak(); // Expected: "Bark!"
cat.speak(); // Expected: "Meow!"


