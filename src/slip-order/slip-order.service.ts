import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { FileService } from 'src/common/file.service';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateSlipOrderRequest,
  SlipOrderParams,
  SlipOrderResponse,
  toSlipOrderResponse,
  UpdateSlipOrderRequest,
} from 'src/model/slip-order/slip-order.model';
import { Logger } from 'winston';
import { SlipOrderValidation } from './slip-order.validation';
import { DepartementService } from 'src/division/departement/departement.service';
import { v4 as uuid } from 'uuid';
import { SlipOrder } from '@prisma/client';

@Injectable()
export class SlipOrderService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private fileService: FileService,
    private departementService: DepartementService,
  ) {}

  getFileDestination(): string {
    return './uploads/slip-order';
  }

  async getAll(): Promise<SlipOrderResponse[]> {
    const slipOrders = await this.prisma.slipOrder.findMany();

    return slipOrders.map((slipOrder) => toSlipOrderResponse(slipOrder));
  }

  async generateNumber(): Promise<string> {
    const lastSlipOrder = await this.prisma.slipOrder.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    let lastNumber: any;

    if (!lastSlipOrder) {
      lastNumber = 1;
    } else {
      lastNumber = parseInt(lastSlipOrder.number.substring(8)) + 1;
    }

    const date = new Date();
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = date.getMonth().toString().padStart(2, '0');
    const yy = date.getFullYear().toString().substring(2, 4);

    return `SO${dd}${mm}${yy}${lastNumber.toString().padStart(4, '0')}`;
  }

  async create(
    req: CreateSlipOrderRequest,
    file: Express.Multer.File,
  ): Promise<SlipOrderResponse> {
    const requestSlipOrder: CreateSlipOrderRequest =
      this.validationService.validate(SlipOrderValidation.CREATE, req);

    const departement = await this.departementService.checkIdIsExist(
      requestSlipOrder.departement_id,
    );
    requestSlipOrder.division_id = departement.division_id;

    requestSlipOrder.id = uuid();
    requestSlipOrder.number = await this.generateNumber();
    requestSlipOrder.recived_date = new Date(requestSlipOrder.recived_date);

    const path = this.fileService.moveFile(
      file.path,
      this.getFileDestination(),
      file.filename,
    );

    requestSlipOrder.file = path;
    requestSlipOrder.file_path = this.getFileDestination();
    requestSlipOrder.original_file_name = file.originalname;

    const slipOrder = await this.prisma.slipOrder.create({
      data: requestSlipOrder,
    });

    return toSlipOrderResponse(slipOrder);
  }

  async checkIdIsExist(id: string): Promise<SlipOrder> {
    const slipOrder = await this.prisma.slipOrder.findFirst({
      where: {
        id: id,
      },
    });

    if (!slipOrder) {
      throw new HttpException('Slip Order not found', 404);
    }

    return slipOrder;
  }

  async get(params: SlipOrderParams): Promise<SlipOrderResponse> {
    const slipOrder = await this.checkIdIsExist(params.id);

    return toSlipOrderResponse(slipOrder);
  }

  async update(
    params: SlipOrderParams,
    req: UpdateSlipOrderRequest,
    file?: Express.Multer.File,
  ): Promise<SlipOrderResponse> {
    const oldSlipOrder = await this.checkIdIsExist(params.id);

    const requestSlipOrder: UpdateSlipOrderRequest =
      this.validationService.validate(SlipOrderValidation.UPDATE, req);

    if (requestSlipOrder.departement_id) {
      const departement = await this.departementService.checkIdIsExist(
        requestSlipOrder.departement_id,
      );
      requestSlipOrder.division_id = departement.division_id;
    }

    if (requestSlipOrder.recived_date) {
      requestSlipOrder.recived_date = new Date(requestSlipOrder.recived_date);
    }

    if (file) {
      this.fileService.deleteFile(oldSlipOrder.file);

      // unlinkSync('./uploads/slip-order/' + oldSlipOrder.file);

      const path = this.fileService.moveFile(
        file.path,
        this.getFileDestination(),
        file.filename,
      );

      requestSlipOrder.file = path;
      requestSlipOrder.file_path = this.getFileDestination();
      requestSlipOrder.original_file_name = file.originalname;
    }

    requestSlipOrder.updated_at = new Date();

    const slipOrder = await this.prisma.slipOrder.update({
      where: {
        id: params.id,
      },
      data: requestSlipOrder,
    });

    return toSlipOrderResponse(slipOrder);
  }

  async delete(params: SlipOrderParams): Promise<SlipOrderResponse> {
    await this.checkIdIsExist(params.id);

    const slipOrder = await this.prisma.slipOrder.delete({
      where: {
        id: params.id,
      },
    });

    this.fileService.deleteFile(slipOrder.file);

    return toSlipOrderResponse(slipOrder);
  }

  async getFile(params: SlipOrderParams): Promise<SlipOrderResponse> {
    const slipOrder = await this.checkIdIsExist(params.id);

    return toSlipOrderResponse(slipOrder);
  }
}
