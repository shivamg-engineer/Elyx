import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LazyLoaderService } from './lazy/lazy-loader.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly lazyLoader: LazyLoaderService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
   const users= await this.lazyLoader.loadUserModule();
   return users;
  }
}

//req lena and res dena
