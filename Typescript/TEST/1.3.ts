//1234567891011121314
function NthDigit1(N:number):string{
let str="";
for(let i=1;i<=N;i++){
  str+=i;
}
console.log(str);
return str[N-1];
}


console.log(NthDigit1(12));