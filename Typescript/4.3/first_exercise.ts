class MathUtils{
    static add(a:number,b:number):number{
       return a+b;
    }
    static subtract(a:number, b:number):number{
    return a-b;
    }
    static  multiply(a:number, b:number):number{
       return a*b;
    }
    static divide(a:number, b:number):number{
     return a/b;
    }
}

console.log(MathUtils.add(4,5));
console.log(MathUtils.subtract(4,5));
console.log(MathUtils.multiply(4,5));
console.log(MathUtils.divide(4,5));