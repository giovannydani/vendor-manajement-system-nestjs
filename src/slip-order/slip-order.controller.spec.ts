import { Test, TestingModule } from '@nestjs/testing';
import { SlipOrderController } from './slip-order.controller';

describe('SlipOrderController', () => {
  let controller: SlipOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlipOrderController],
    }).compile();

    controller = module.get<SlipOrderController>(SlipOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
