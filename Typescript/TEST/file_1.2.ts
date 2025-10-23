function recursion1(start: number, end: number, result: number[]): void {
    if (start < end) return;

    result.push(start);
    recursion1(start - 1, end, result);
}
function recursion2(start: number, end: number, result: number[]): void {
    if (start > end) return
    result.push(start);
    recursion2(start + 1, end, result);
}

function combinedRec(n:number):void {
  if(n==0) return;

  let result:number[]=[];
  recursion1(n,1,result);
  recursion2(2,n,result);

 console.log(result.join("-")); // prints on same line

  combinedRec(n-1);
}
combinedRec(5);