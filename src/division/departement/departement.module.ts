import { forwardRef, Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { DivisionModule } from '../division.module';

@Module({
  imports: [forwardRef(() => DivisionModule)],
  providers: [DepartementService],
  controllers: [DepartementController],
  exports: [DepartementService],
})
export class DepartementModule {}
