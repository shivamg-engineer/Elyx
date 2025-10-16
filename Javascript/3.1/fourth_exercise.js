function celciusToFahrenheit(...celcius){

// return array=[...((celsius * 9) / 5 + 32)];
return celcius.map((celcius)=>(celcius*9)/5+32);
}
console.log(celciusToFahrenheit(36,34,54))