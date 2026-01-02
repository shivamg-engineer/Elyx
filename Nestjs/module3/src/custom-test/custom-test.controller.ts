import { Controller,Get,Inject } from "@nestjs/common";

@Controller('/test')
export class CustomTestController {
    constructor(@Inject('ASYNC_VALUE') private readonly asyncValue:string){}

    @Get()
    getValue(){
        return {
            message:'Custom async provider working!',
            value:this.asyncValue
        };
    }
}