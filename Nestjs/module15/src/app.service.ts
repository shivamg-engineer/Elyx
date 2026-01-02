import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    // return 'Hello World!';
    const message = 'Hello nestJS ESLint';

    console.log(message);

    const unusedValue = 42;

    return message;
  }
}
