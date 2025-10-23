class Singleton{
    private static instance : Singleton;
    private constructor(){
        console.log("instance method");
    }

    static getInstance():Singleton{
        if(!Singleton.instance){
            Singleton.instance= new Singleton();
        }
        return Singleton.instance;
    }
}

const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();
console.log(obj1 === obj2); // true (same instance)
