import { Test, TestingModule } from '@nestjs/testing';
import { VendorOrdersService } from './vendor-orders.service';

describe('VendorOrdersService', () => {
  let service: VendorOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorOrdersService],
    }).compile();

    service = module.get<VendorOrdersService>(VendorOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
