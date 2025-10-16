function createMultiplier(factor){
  return function(multiplier){
        return factor* multiplier;
  }
}

const double = createMultiplier(2);
console.log(double(5)); // 10

const triple = createMultiplier(3);
console.log(triple(4)); // 12
