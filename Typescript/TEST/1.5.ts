let arr1:number[] = [4, 3, 2, 4, 1,1,0, 3, 2];

let answer:number=0;
for(let i=0;i<arr1.length;i++){
answer^=arr1[i];
}
console.log(answer);