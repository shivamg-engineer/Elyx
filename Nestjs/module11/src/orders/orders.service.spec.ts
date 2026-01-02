import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should calculate total correctly', () => {
    const prices = [100, 200, 50];

    const result = service.calculateTotal(prices);

    expect(result).toBe(350);
  });

  it('should return 0 for empty array', () => {
    const result = service.calculateTotal([]);

    expect(result).toBe(0);
  });
});
