function wait(ms){
return new Promise(resolve=> setTimeout(resolve,ms));
}

wait(2000).then(()=>console.log("waited 2 seconds"));
