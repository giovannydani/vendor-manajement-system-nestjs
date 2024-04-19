import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateVendorRequest,
  toVendorResponse,
  UpdateVendorRequest,
  VendorParams,
  VendorResponse,
} from 'src/model/vendor/vendor.model';
import { Logger } from 'winston';
import { VendorValidation } from './vendor.validation';
import { v4 as uuid } from 'uuid';
import { Vendor } from '@prisma/client';

@Injectable()
export class VendorService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<VendorResponse[]> {
    const vendors = await this.prisma.vendor.findMany();

    return vendors.map((vendor) => toVendorResponse(vendor));
  }

  async getLastVendorNumber(): Promise<number> {
    const vendor = await this.prisma.vendor.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!vendor) {
      return 1;
    }

    return parseInt(vendor.number.substring(2)) + 1;
  }

  async create(req: CreateVendorRequest): Promise<VendorResponse> {
    const requestVendor: CreateVendorRequest = this.validationService.validate(
      VendorValidation.CREATE,
      req,
    );

    requestVendor.id = uuid();

    const lastNumber = await this.getLastVendorNumber();
    requestVendor.number = `VN${lastNumber.toString().padStart(5, '0')}`;

    const vendor = await this.prisma.vendor.create({
      data: requestVendor,
    });

    return toVendorResponse(vendor);
  }

  async checkIdIsExist(id: string): Promise<Vendor> {
    const vendor = await this.prisma.vendor.findFirst({
      where: {
        id,
      },
    });

    if (!vendor) {
      throw new HttpException('Vendor not found', 404);
    }

    return vendor;
  }

  async get(params: VendorParams): Promise<VendorResponse> {
    const vendor = await this.checkIdIsExist(params.id);

    return toVendorResponse(vendor);
  }

  async update(
    params: VendorParams,
    req: UpdateVendorRequest,
  ): Promise<VendorResponse> {
    await this.checkIdIsExist(params.id);

    const requestVendor: UpdateVendorRequest = this.validationService.validate(
      VendorValidation.UPDATE,
      req,
    );

    requestVendor.updated_at = new Date();

    if (requestVendor.notes == '') {
      requestVendor.notes = null;
    }

    const vendor = await this.prisma.vendor.update({
      where: {
        id: params.id,
      },
      data: requestVendor,
    });

    return toVendorResponse(vendor);
  }

  async delete(params: VendorParams): Promise<VendorResponse> {
    await this.checkIdIsExist(params.id);

    const vendor = await this.prisma.vendor.delete({
      where: {
        id: params.id,
      },
    });

    return toVendorResponse(vendor);
  }
}
