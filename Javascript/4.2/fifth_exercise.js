const canFly={
    fly(){
        console.log("Flying high!");
    }
};

const canSwim={
    swim(){
        console.log("Swimming deep!");
    }
}

const canWalk={
    walk(){
        console.log("Walking on four legs!");
    }
}

class Bird{
    constructor(){
        return Object.assign(this, canFly);
    }
}

class Fish {
  constructor() {
    Object.assign(this, canSwim);
  }
}

class Dog {
  constructor() {
    Object.assign(this, canWalk);
  }
}

const bird=new Bird();
bird.fly();

const fish=new Fish();
fish.swim();

const dog=new Dog();
dog.walk();