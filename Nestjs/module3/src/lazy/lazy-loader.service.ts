import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyLoaderService {
  async loadBigFeature() {
    const { BigFeatureModule } = await import(
      '../big-feature/big-feature.module.js'
    );
  }
  async loadUserModule() {
    // Dynamic import — module is loaded only when called
    const { UsersModule } = await import('../users/users.module.js');
    const { UsersService } = await import('../users/users.service.js');

    const service = new UsersService();
    return service.getUsers();
  }
}
