import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { SlipOrderModule } from '../slip-order.module';
import { CategoryModule } from './category/category.module';
import { UnitModule } from 'src/unit/unit.module';

@Module({
  imports: [forwardRef(() => SlipOrderModule), CategoryModule, UnitModule],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
