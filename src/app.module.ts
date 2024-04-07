import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
