class Car{
    #engineType;

    constructor(engineType){
        this.#engineType=engineType;
    }

    start(){
        this.#startEngine();
    }

    #startEngine(){
        console.log(`${this.#engineType} engine started!`);
    }
}

const myCar = new Car("V8");
myCar.start();