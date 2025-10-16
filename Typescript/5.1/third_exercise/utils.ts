export function capitalize(str:string):string{
    if(!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str:string):string{
 if(!str) return "";
    return str.split("").reverse().join("");
}

export function isEven(num:number):boolean{
return num%2===0;
}