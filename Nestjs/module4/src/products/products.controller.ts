import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {

    @Get()
    findAll(){
        return 'All products';
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return `Product ${id}`;
    }
}
