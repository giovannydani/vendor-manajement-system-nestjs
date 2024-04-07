import { Global, Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
  ],
  providers: [
    ValidationService,
    PrismaService,
    { provide: APP_FILTER, useClass: ErrorFilter },
  ],
  exports: [ValidationService, PrismaService],
})
export class CommonModule {}
