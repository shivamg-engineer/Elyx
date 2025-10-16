// Define a function concatStrings(str1: string, str2?: string): string that concatenates two strings and returns the result. Handle cases where str2 is missing.
function concatStrings(str1:string , str2?:string):string{
// if(str2){
//     return str1.concat(str2);
// }else{
//     return str1;
// }
return str2 ? str1 + str2 : str1;
}

console.log(concatStrings("shivam ","gupta"));
console.log(concatStrings("Shyam",""));