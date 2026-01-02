import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { LoggerService } from '../logger/logger.service';
import { PAYMENT_TOKEN } from './payment.provider';

// 🚀 3. The Full Unit Test (Works 100%)
describe('paymentService', () => {
  let service: PaymentService;
  let loggerMock: { log: jest.Mock };
    let paymentRepoMock: any;

  beforeEach(async () => {
    loggerMock = {
      log: jest.fn(), // fake log() method
    };

    paymentRepoMock = {
      save: jest.fn(),
      find: jest.fn(),
    };


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: LoggerService,
          useValue: loggerMock, // 👈 mocked provider injected here
        },
        {
          provide: PAYMENT_TOKEN,   // <— MISSING EARLIER
          useValue: paymentRepoMock,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should charge and call logger', () => {
    const result = service.charge(50);

    expect(result).toBe(100); // 50 * 2 // real logic
    expect(loggerMock.log).toHaveBeenCalledWith('charging $50'); // mock used
  });
});

// PaymentService

// LoggerService

// Dynamic module (LoggerModule)

// The unit test (payment.service.spec.ts)

// Any required token definitions
