import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateUnitRequest,
  toUnitResponse,
  UnitParams,
  UnitResponse,
  UpdateUnitRequest,
} from 'src/model/unit/unit.model';
import { Logger } from 'winston';
import { UnitValidation } from './unit.validation';
import { v4 as uuid } from 'uuid';
import { Unit } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<UnitResponse[]> {
    const units = await this.prisma.unit.findMany();

    return units.map((unit) => toUnitResponse(unit));
  }

  async create(req: CreateUnitRequest): Promise<UnitResponse> {
    const requestUnit = this.validationService.validate(
      UnitValidation.CREATE,
      req,
    );

    requestUnit.id = uuid();

    const unit = await this.prisma.unit.create({
      data: requestUnit,
    });

    return toUnitResponse(unit);
  }

  async checkIdIsExist(id: string): Promise<Unit> {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id: id,
      },
    });

    if (!unit) {
      throw new HttpException('Unit not found', 404);
    }

    return unit;
  }

  async get(params: UnitParams): Promise<UnitResponse> {
    const unit = await this.checkIdIsExist(params.id);

    return toUnitResponse(unit);
  }

  async update(
    params: UnitParams,
    req: UpdateUnitRequest,
  ): Promise<UnitResponse> {
    await this.checkIdIsExist(params.id);

    const requestUnit = this.validationService.validate(
      UnitValidation.UPDATE,
      req,
    );

    const unit = await this.prisma.unit.update({
      where: {
        id: params.id,
      },
      data: requestUnit,
    });

    return toUnitResponse(unit);
  }

  async delete(params: UnitParams): Promise<UnitResponse> {
    await this.checkIdIsExist(params.id);

    const unit = await this.prisma.unit.delete({
      where: {
        id: params.id,
      },
    });

    return toUnitResponse(unit);
  }
}
