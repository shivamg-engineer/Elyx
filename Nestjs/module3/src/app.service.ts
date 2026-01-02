import { BeforeApplicationShutdown, Injectable, OnModuleDestroy, OnModuleInit,OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit,OnModuleDestroy, BeforeApplicationShutdown,OnApplicationShutdown{

  onModuleInit() {
    console.log('AppService has been initialized.');
  }
  onModuleDestroy() {
    console.log('AppService is being destroyed.');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('⚡ Application is shutting down. Signal:', signal);
  }
  onApplicationShutdown(signal?: string) {
    console.log('✅ Application shutdown complete. Signal:', signal);
  }
  getHello(): string {
    return 'Hello World!';
  }

  
}
