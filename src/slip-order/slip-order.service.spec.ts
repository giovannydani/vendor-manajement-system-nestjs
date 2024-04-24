import { Test, TestingModule } from '@nestjs/testing';
import { SlipOrderService } from './slip-order.service';

describe('SlipOrderService', () => {
  let service: SlipOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlipOrderService],
    }).compile();

    service = module.get<SlipOrderService>(SlipOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
