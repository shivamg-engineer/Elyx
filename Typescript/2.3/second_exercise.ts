function calculateBMI(weight: number, height: number): number{
return weight / (height ** 2);

}
console.log(calculateBMI(70,1.75).toFixed(2));