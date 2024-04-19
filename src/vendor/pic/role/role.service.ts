import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreatePicRoleRequest,
  PicRoleParams,
  PicRoleResponse,
  toPicRoleResponse,
  UpdatePicRoleRequest,
} from 'src/model/vendor/pic/role/role.model';
import { Logger } from 'winston';
import { PicRoleValidation } from './role.validation';
import { v4 as uuid } from 'uuid';
import { PicRole } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<PicRoleResponse[]> {
    const picRoles = await this.prisma.picRole.findMany();
    return picRoles.map((picRole) => toPicRoleResponse(picRole));
  }

  async create(req: CreatePicRoleRequest): Promise<PicRoleResponse> {
    const requestPicRole: CreatePicRoleRequest =
      this.validationService.validate(PicRoleValidation.CREATE, req);

    requestPicRole.id = uuid();

    const picRole = await this.prisma.picRole.create({
      data: requestPicRole,
    });

    return toPicRoleResponse(picRole);
  }

  async checkIdIsExist(id: string): Promise<PicRole> {
    const picRole = await this.prisma.picRole.findFirst({
      where: {
        id: id,
      },
    });

    if (!picRole) {
      throw new HttpException('Role not found', 404);
    }

    return picRole;
  }

  async get(params: PicRoleParams): Promise<PicRoleResponse> {
    const picRole = await this.checkIdIsExist(params.id);

    return toPicRoleResponse(picRole);
  }

  async update(
    req: UpdatePicRoleRequest,
    params: PicRoleParams,
  ): Promise<PicRoleResponse> {
    await this.checkIdIsExist(params.id);
    const requestPicRole: UpdatePicRoleRequest =
      this.validationService.validate(PicRoleValidation.UPDATE, req);

    const picRole = await this.prisma.picRole.update({
      where: {
        id: params.id,
      },
      data: requestPicRole,
    });

    return toPicRoleResponse(picRole);
  }

  async delete(params: PicRoleParams): Promise<PicRoleResponse> {
    await this.checkIdIsExist(params.id);

    const picRole = await this.prisma.picRole.delete({
      where: {
        id: params.id,
      },
    });

    return toPicRoleResponse(picRole);
  }
}
