import { Test, TestingModule } from '@nestjs/testing';
import { VendorsAuthService } from './vendors-auth.service';

describe('VendorsAuthService', () => {
  let service: VendorsAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorsAuthService],
    }).compile();

    service = module.get<VendorsAuthService>(VendorsAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
