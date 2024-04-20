import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateDepartementRequest,
  DepartementParams,
  DepartementResponse,
  toDepartementResponse,
  UpdateDepartementRequest,
} from 'src/model/division/departement/departement.model';
import { Logger } from 'winston';
import { DivisionService } from '../division.service';
import { DepartementValidation } from './departement.validation';
import { v4 as uuid } from 'uuid';
import { Departement } from '@prisma/client';

@Injectable()
export class DepartementService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private divisionService: DivisionService,
  ) {}

  async getAll(params: DepartementParams): Promise<DepartementResponse[]> {
    await this.divisionService.checkIdIsExist(params.division_id);

    const departements = await this.prisma.departement.findMany({
      where: {
        division_id: params.division_id,
      },
    });

    return departements.map((departement) =>
      toDepartementResponse(departement),
    );
  }

  async create(
    params: DepartementParams,
    req: CreateDepartementRequest,
  ): Promise<DepartementResponse> {
    await this.divisionService.checkIdIsExist(params.division_id);

    const requestDepartement: CreateDepartementRequest =
      this.validationService.validate(DepartementValidation.CREATE, req);

    requestDepartement.id = uuid();
    requestDepartement.division_id = params.division_id;

    const departement = await this.prisma.departement.create({
      data: requestDepartement,
    });

    return toDepartementResponse(departement);
  }

  async checkIdIsExist(id: string, division_id?: string): Promise<Departement> {
    const departement = await this.prisma.departement.findFirst({
      where: {
        id: id,
        division_id: division_id,
      },
    });

    if (!departement) {
      throw new HttpException('Departement not found', 404);
    }

    return departement;
  }

  async get(params: DepartementParams): Promise<DepartementResponse> {
    await this.divisionService.checkIdIsExist(params.division_id);

    const departement = await this.checkIdIsExist(
      params.id,
      params.division_id,
    );

    return toDepartementResponse(departement);
  }

  async update(params: DepartementParams, req: UpdateDepartementRequest) {
    await this.divisionService.checkIdIsExist(params.division_id);
    await this.checkIdIsExist(params.id, params.division_id);

    const requestDepartement: UpdateDepartementRequest =
      this.validationService.validate(DepartementValidation.UPDATE, req);

    const departement = await this.prisma.departement.update({
      where: {
        id: params.id,
      },
      data: requestDepartement,
    });

    return toDepartementResponse(departement);
  }

  async delete(params: DepartementParams) {
    await this.divisionService.checkIdIsExist(params.division_id);
    await this.checkIdIsExist(params.id, params.division_id);

    const departement = await this.prisma.departement.delete({
      where: {
        id: params.id,
      },
    });

    return toDepartementResponse(departement);
  }
}
