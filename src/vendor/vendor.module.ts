import { Module } from '@nestjs/common';
import { PicModule } from './pic/pic.module';

@Module({
  imports: [PicModule]
})
export class VendorModule {}
