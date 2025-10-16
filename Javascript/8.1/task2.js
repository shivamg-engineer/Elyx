const arr1=[4,2, 3, 1];
const arr2=[6,543,21];
const merged=[...arr1,...arr2];
console.log(merged);

function sum(...numbers){
return numbers.reduce((total,num)=> total+num,0);
}
console.log(sum(4,3,2,1));