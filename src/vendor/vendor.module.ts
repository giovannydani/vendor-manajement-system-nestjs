import { Module } from '@nestjs/common';
import { PicModule } from './pic/pic.module';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';

@Module({
  imports: [PicModule],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
