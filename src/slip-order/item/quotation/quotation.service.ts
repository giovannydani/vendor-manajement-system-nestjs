import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { ItemService } from '../item.service';
import { VendorService } from 'src/vendor/vendor.service';
import { UnitService } from 'src/unit/unit.service';
import {
  CreateQuotationRequest,
  QuotationParams,
  QuotationResponse,
  toQuotationResponse,
  UpdateQuotationRequest,
} from 'src/model/slip-order/item/quotation/quotation.model';
import { SlipOrderService } from 'src/slip-order/slip-order.service';
import { QuotationValidation } from './quotation.validation';
import { v4 as uuid } from 'uuid';
import { FileService } from 'src/common/file.service';
import { Quotation } from '@prisma/client';

@Injectable()
export class QuotationService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private slipOrder: SlipOrderService,
    private itemService: ItemService,
    private vendorService: VendorService,
    private unitService: UnitService,
    private fileService: FileService,
  ) {}

  getFileDestination(): string {
    return './uploads/slip-order/quotation';
  }

  async getAll(params: QuotationParams): Promise<QuotationResponse[]> {
    await this.slipOrder.checkIdIsExist(params.slip_order_id);
    await this.itemService.checkIdIsExist(params.item_id, params.slip_order_id);

    const quotations = await this.prisma.quotation.findMany({
      where: {
        item_id: params.item_id,
      },
    });

    return quotations.map((quotation) => toQuotationResponse(quotation));
  }

  async create(
    params: QuotationParams,
    req: CreateQuotationRequest,
    file: Express.Multer.File,
  ): Promise<QuotationResponse> {
    await this.slipOrder.checkIdIsExist(params.slip_order_id);
    await this.itemService.checkIdIsExist(params.item_id, params.slip_order_id);

    const requestQuotation: CreateQuotationRequest =
      this.validationService.validate(QuotationValidation.CREATE, req);

    await this.vendorService.checkIdIsExist(requestQuotation.vendor_id);
    await this.unitService.checkIdIsExist(requestQuotation.unit_id);

    requestQuotation.id = uuid();
    requestQuotation.item_id = params.item_id;
    requestQuotation.recived_date = new Date(requestQuotation.recived_date);
    requestQuotation.request_date = new Date(requestQuotation.request_date);
    requestQuotation.quantity = parseInt(requestQuotation.quantity.toString());
    requestQuotation.price = parseInt(requestQuotation.price.toString());

    if (requestQuotation.quotation) {
      requestQuotation.quotation = parseInt(
        requestQuotation.quotation.toString(),
      );
    }

    const path = this.fileService.moveFile(
      file.path,
      this.getFileDestination(),
      file.filename,
    );

    requestQuotation.file = path;
    requestQuotation.file_path = this.getFileDestination();
    requestQuotation.original_file_name = file.originalname;

    const quotation = await this.prisma.quotation.create({
      data: requestQuotation,
    });

    return toQuotationResponse(quotation);
  }

  async checkIdIsExist(id: string, item_id?: string): Promise<Quotation> {
    const quotation = await this.prisma.quotation.findFirst({
      where: {
        id: id,
        item_id: item_id,
      },
    });

    if (!quotation) {
      throw new HttpException('Quotation not found', 404);
    }

    return quotation;
  }

  async get(params: QuotationParams): Promise<QuotationResponse> {
    await this.slipOrder.checkIdIsExist(params.slip_order_id);
    await this.itemService.checkIdIsExist(params.item_id, params.slip_order_id);

    const quotation = await this.checkIdIsExist(params.id, params.item_id);

    return toQuotationResponse(quotation);
  }

  async update(
    params: QuotationParams,
    req: UpdateQuotationRequest,
    // req2: CreateQuotationRequest,
    file?: Express.Multer.File,
  ) {
    await this.slipOrder.checkIdIsExist(params.slip_order_id);
    await this.itemService.checkIdIsExist(params.item_id, params.slip_order_id);
    const oldQuotation = await this.checkIdIsExist(params.id, params.item_id);

    const requestQuotation: UpdateQuotationRequest =
      this.validationService.validate(QuotationValidation.UPDATE, req);

    if (requestQuotation.vendor_id) {
      await this.vendorService.checkIdIsExist(requestQuotation.vendor_id);
    }

    if (requestQuotation.unit_id) {
      await this.unitService.checkIdIsExist(requestQuotation.unit_id);
    }

    if (requestQuotation.recived_date) {
      requestQuotation.recived_date = new Date(requestQuotation.recived_date);
    }

    if (requestQuotation.request_date) {
      requestQuotation.request_date = new Date(requestQuotation.request_date);
    }

    if (requestQuotation.quantity) {
      requestQuotation.quantity = parseInt(
        requestQuotation.quantity.toString(),
      );
    }

    if (requestQuotation.price) {
      requestQuotation.price = parseInt(requestQuotation.price.toString());
    }

    if (requestQuotation.quotation) {
      requestQuotation.quotation = parseInt(
        requestQuotation.quotation.toString(),
      );
    }

    if (file) {
      this.fileService.deleteFile(oldQuotation.file);

      const path = this.fileService.moveFile(
        file.path,
        this.getFileDestination(),
        file.filename,
      );

      requestQuotation.file = path;
      requestQuotation.file_path = this.getFileDestination();
      requestQuotation.original_file_name = file.originalname;
    }

    const quotation = await this.prisma.quotation.update({
      where: {
        id: params.id,
      },
      data: requestQuotation,
    });

    return toQuotationResponse(quotation);
  }

  async delete(params: QuotationParams): Promise<QuotationResponse> {
    await this.slipOrder.checkIdIsExist(params.slip_order_id);
    await this.itemService.checkIdIsExist(params.item_id, params.slip_order_id);
    await this.checkIdIsExist(params.id, params.item_id);

    const quotation = await this.prisma.quotation.delete({
      where: {
        id: params.id,
      },
    });

    return toQuotationResponse(quotation);
  }
}
