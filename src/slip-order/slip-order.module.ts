import { Module } from '@nestjs/common';
import { SlipOrderService } from './slip-order.service';
import { SlipOrderController } from './slip-order.controller';
import { DepartementModule } from 'src/division/departement/departement.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [DepartementModule, ItemModule],
  providers: [SlipOrderService],
  controllers: [SlipOrderController],
  exports: [SlipOrderService],
})
export class SlipOrderModule {}
