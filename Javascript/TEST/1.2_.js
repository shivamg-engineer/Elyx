function rec1(start, end,result) {
  if (start < end) return;
  result.push(start);
  rec1(start - 1, end,result);
}

function rec2(start, end,result) {
  if (start > end) return;
  result.push(start);
  rec2(start+1,end,result);
}

function combined(n) {
  if (n === 0) return;
  
  let result = [];
  rec1(n, 1, result);
  rec2(2, n, result);
  
  console.log(result.join(" ")); // prints on same line
  
  combined(n - 1);
}
combined(5);
