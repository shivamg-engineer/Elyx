

function NthDigit(N){

    let str="";

    for(let i=1;i<=N;i++){
      str+=i;
    }
    console.log(str);
    return str[N-1];

}
console.log(NthDigit(15));