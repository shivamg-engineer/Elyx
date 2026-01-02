import { Controller, Get } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';

@Roles('admin')
@Controller('users')
export class UsersController {
    @Get()
    findAll() {
        return 'Admin access granted';
    }
}

