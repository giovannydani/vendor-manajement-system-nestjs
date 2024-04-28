import { forwardRef, Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { ItemModule } from '../item.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { UnitModule } from 'src/unit/unit.module';
import { SlipOrderModule } from 'src/slip-order/slip-order.module';

@Module({
  imports: [
    forwardRef(() => ItemModule),
    VendorModule,
    UnitModule,
    forwardRef(() => SlipOrderModule),
  ],
  providers: [QuotationService],
  controllers: [QuotationController],
  exports: [QuotationService],
})
export class QuotationModule {}
