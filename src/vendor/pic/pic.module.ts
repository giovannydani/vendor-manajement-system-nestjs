import { forwardRef, Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PicService } from './pic.service';
import { VendorModule } from '../vendor.module';
import { PicController } from './pic.controller';

@Module({
  imports: [RoleModule, forwardRef(() => VendorModule)],
  providers: [PicService],
  controllers: [PicController],
})
export class PicModule {}
