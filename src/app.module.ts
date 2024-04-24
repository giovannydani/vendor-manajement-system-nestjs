import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VendorModule } from './vendor/vendor.module';
import { DivisionModule } from './division/division.module';
import { UnitModule } from './unit/unit.module';
import { SlipOrderModule } from './slip-order/slip-order.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UsersModule,
    VendorModule,
    DivisionModule,
    UnitModule,
    SlipOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
