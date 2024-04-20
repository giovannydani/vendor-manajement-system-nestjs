import { Module } from '@nestjs/common';
import { DepartementModule } from './departement/departement.module';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';

@Module({
  imports: [DepartementModule],
  providers: [DivisionService],
  controllers: [DivisionController],
  exports: [DivisionService],
})
export class DivisionModule {}
