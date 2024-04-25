import { forwardRef, Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { ItemModule } from '../item.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { UnitModule } from 'src/unit/unit.module';

@Module({
  imports: [forwardRef(() => ItemModule), VendorModule, UnitModule],
  providers: [QuotationService],
  controllers: [QuotationController],
})
export class QuotationModule {}
