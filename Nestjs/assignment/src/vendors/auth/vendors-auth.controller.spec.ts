import { Test, TestingModule } from '@nestjs/testing';
import { VendorsAuthController } from './vendors-auth.controller';

describe('VendorsAuthController', () => {
  let controller: VendorsAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorsAuthController],
    }).compile();

    controller = module.get<VendorsAuthController>(VendorsAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
