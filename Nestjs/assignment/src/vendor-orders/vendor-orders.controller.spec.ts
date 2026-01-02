import { Test, TestingModule } from '@nestjs/testing';
import { VendorOrdersController } from './vendor-orders.controller';

describe('VendorOrdersController', () => {
  let controller: VendorOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorOrdersController],
    }).compile();

    controller = module.get<VendorOrdersController>(VendorOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
