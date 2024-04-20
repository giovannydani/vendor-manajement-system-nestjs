import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VendorModule } from './vendor/vendor.module';
import { DivisionModule } from './division/division.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UsersModule,
    VendorModule,
    DivisionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
