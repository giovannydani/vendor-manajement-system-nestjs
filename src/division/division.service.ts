import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  DivisionResponse,
  toDivisionResponse,
  CreateDivisionRequest,
  DivisionParams,
  UpdateDivisionRequest,
} from 'src/model/division/division.model';
import { Logger } from 'winston';
import { DivisionValidation } from './division.validation';
import { v4 as uuid } from 'uuid';
import { Division } from '@prisma/client';

@Injectable()
export class DivisionService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<DivisionResponse[]> {
    const divisions = await this.prisma.division.findMany();
    return divisions.map((division) => toDivisionResponse(division));
  }

  async create(req: CreateDivisionRequest): Promise<DivisionResponse> {
    const requestDivision: CreateDivisionRequest =
      this.validationService.validate(DivisionValidation.CREATE, req);

    requestDivision.id = uuid();

    const division = await this.prisma.division.create({
      data: requestDivision,
    });

    return toDivisionResponse(division);
  }

  async checkIdIsExist(id: string): Promise<Division> {
    const division = await this.prisma.division.findFirst({
      where: {
        id: id,
      },
    });

    if (!division) {
      throw new HttpException('Division not found', 404);
    }

    return division;
  }

  async get(params: DivisionParams): Promise<DivisionResponse> {
    const division = await this.checkIdIsExist(params.id);

    return toDivisionResponse(division);
  }

  async update(params: DivisionParams, req: UpdateDivisionRequest) {
    await this.checkIdIsExist(params.id);

    const requestDivision: UpdateDivisionRequest =
      this.validationService.validate(DivisionValidation.UPDATE, req);

    const division = await this.prisma.division.update({
      where: {
        id: params.id,
      },
      data: requestDivision,
    });

    return toDivisionResponse(division);
  }

  async delete(params: DivisionParams): Promise<DivisionResponse> {
    await this.checkIdIsExist(params.id);

    const division = await this.prisma.division.delete({
      where: {
        id: params.id,
      },
    });

    return toDivisionResponse(division);
  }
}
