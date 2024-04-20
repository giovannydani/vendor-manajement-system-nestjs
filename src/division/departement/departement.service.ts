import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  DepartementResponse,
  toDepartementResponse,
} from 'src/model/division/departement/departement.model';
import { Logger } from 'winston';

@Injectable()
export class DepartementService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<DepartementResponse[]> {
    const departements = await this.prisma.departement.findMany();

    return departements.map((departement) =>
      toDepartementResponse(departement),
    );
  }
}
