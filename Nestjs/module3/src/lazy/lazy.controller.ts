import {Controller, Get} from '@nestjs/common';
import {LazyLoaderService} from './lazy-loader.service';

@Controller('lazy')
export class LazyController{
    constructor(private readonly lazyLoaderservice:LazyLoaderService){}

    @Get()
    async loadFeature(){
        return await this.lazyLoaderservice.loadBigFeature();
    }
}