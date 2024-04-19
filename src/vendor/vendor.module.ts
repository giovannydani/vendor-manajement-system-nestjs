import { Module } from '@nestjs/common';
import { PicModule } from './pic/pic.module';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { AccountModule } from './account/account.module';

@Module({
  imports: [PicModule, AccountModule],
  providers: [VendorService],
  controllers: [VendorController],
  exports: [VendorService],
})
export class VendorModule {}
