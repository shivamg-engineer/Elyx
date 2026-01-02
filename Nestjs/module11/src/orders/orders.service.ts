import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    calculateTotal(prices:number[]):number{
        return prices.reduce((sum,price)=>sum+price,0);
    }
}
