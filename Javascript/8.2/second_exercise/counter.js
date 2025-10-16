
export function increase(count){
return count=count+1;   
}

export function decrease(count){
    if(count<=0) return 0;
    return count=count-1;
}
export function reset(){
    return 0;
}