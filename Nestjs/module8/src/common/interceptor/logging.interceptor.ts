import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import winston from "winston/lib/winston/config";
import { winstonLogger } from "../logger/winston.logger";
import { timeStamp } from "console";


@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request= context.switchToHttp().getRequest();
        const {method, url}= request;
        const startTime = Date.now();
                   
        return next.handle().pipe(
            tap(()=>{
                const responseTime= Date.now()- startTime;

                winstonLogger.info({
                    message:'HTTP Request',
                    method,
                    url,
                    responseTime:`${responseTime}ms`,
                    timeStamp: new Date().toISOString()
                })
            })
        )
    }
}