import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { ItemService } from '../item.service';
import { VendorService } from 'src/vendor/vendor.service';
import { UnitService } from 'src/unit/unit.service';

@Injectable()
export class QuotationService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private itemService: ItemService,
    private vendorService: VendorService,
    private unitService: UnitService,
  ) {}
}
