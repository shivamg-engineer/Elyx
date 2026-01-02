import { Injectable,Inject } from "@nestjs/common";
import { PAYMENT_TOKEN } from "./payment.provider";
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class PaymentService{
    constructor(@Inject(PAYMENT_TOKEN)private readonly paymentService:any,
private readonly logger: LoggerService){}

    process(amount:number){
        return this.paymentService.pay(amount);
    }

    charge(amount:number){
        this.logger.log(`charging $${amount}`);
        return amount*2;
    }
}