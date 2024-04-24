import { Module } from '@nestjs/common';
import { SlipOrderService } from './slip-order.service';
import { SlipOrderController } from './slip-order.controller';
import { DepartementModule } from 'src/division/departement/departement.module';

@Module({
  imports: [DepartementModule],
  providers: [SlipOrderService],
  controllers: [SlipOrderController],
})
export class SlipOrderModule {}
