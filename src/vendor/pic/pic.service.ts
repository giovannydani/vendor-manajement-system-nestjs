import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { v4 as uuid } from 'uuid';
import {
  CreatePicRequest,
  PicParams,
  PicResponse,
  toPicResponse,
  UpdatePicRequest,
} from 'src/model/vendor/pic/pic.model';
import { VendorService } from '../vendor.service';
import { RoleService } from './role/role.service';
import { PicValidation } from './pic.validation';
import { Pic } from '@prisma/client';

@Injectable()
export class PicService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    // @Inject(forwardRef(() => VendorService))
    private vendorService: VendorService,
    private roleService: RoleService,
  ) {}

  async getAll(params: PicParams): Promise<PicResponse[]> {
    await this.vendorService.checkIdIsExist(params.vendor_id);

    const pics = await this.prisma.pic.findMany({
      where: {
        vendor_id: params.vendor_id,
      },
    });

    return pics.map((pic) => toPicResponse(pic));
  }

  async checkEmailIsExist(email: string, except?: string): Promise<boolean> {
    if (except && email == except) {
      return false;
    }

    const pic = await this.prisma.pic.findFirst({
      where: {
        email: email,
      },
    });

    if (!pic) {
      return false;
    }

    return true;
  }

  async create(params: PicParams, req: CreatePicRequest): Promise<PicResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    await this.roleService.checkIdIsExist(req.role_id);

    if (await this.checkEmailIsExist(req.email)) {
      throw new HttpException('Email already exists', 400);
    }

    const requestPic: CreatePicRequest = this.validationService.validate(
      PicValidation.CREATE,
      req,
    );

    requestPic.id = uuid();
    requestPic.vendor_id = params.vendor_id;

    if (requestPic.default == undefined) {
      requestPic.default = false;
    }

    const pic = await this.prisma.pic.create({
      data: requestPic,
    });

    return toPicResponse(pic);
  }

  async checkIdIsExist(id: string, vendor_id: string): Promise<Pic> {
    const pic = await this.prisma.pic.findFirst({
      where: {
        id: id,
        vendor_id: vendor_id,
      },
    });

    if (!pic) {
      throw new HttpException('Pic not found', 404);
    }

    return pic;
  }

  async get(params: PicParams): Promise<PicResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    const pic = await this.checkIdIsExist(params.id, params.vendor_id);

    return toPicResponse(pic);
  }

  async update(params: PicParams, req: UpdatePicRequest): Promise<PicResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    const pic = await this.checkIdIsExist(params.id, params.vendor_id);

    const requestPic: UpdatePicRequest = this.validationService.validate(
      PicValidation.UPDATE,
      req,
    );

    if (requestPic.role_id) {
      await this.roleService.checkIdIsExist(requestPic.role_id);
    }

    if (requestPic.email) {
      await this.checkEmailIsExist(requestPic.email, pic.email);
    }

    const updatedPic = await this.prisma.pic.update({
      where: {
        id: params.id,
      },
      data: requestPic,
    });

    return toPicResponse(updatedPic);
  }

  async delete(params: PicParams): Promise<PicResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    await this.checkIdIsExist(params.id, params.vendor_id);

    const pic = await this.prisma.pic.delete({
      where: {
        id: params.id,
      },
    });

    return toPicResponse(pic);
  }
}
