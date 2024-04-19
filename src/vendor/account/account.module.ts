import { forwardRef, Module } from '@nestjs/common';
import { BankModule } from './bank/bank.module';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { VendorModule } from '../vendor.module';

@Module({
  imports: [BankModule, forwardRef(() => VendorModule)],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
