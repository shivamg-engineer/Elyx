class Logger{
    static log(str:string):void{
    console.log(`${new Date()} : ${str}`);
    }
}

Logger.log("Hello typescript");