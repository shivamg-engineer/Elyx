interface Logger{
    log(message: string):void;

}
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`Log: ${message}`);
  }
}
const logger = new ConsoleLogger();
logger.log("System initialized.");
