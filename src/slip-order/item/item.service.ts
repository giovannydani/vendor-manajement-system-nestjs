import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateItemRequest,
  ItemParams,
  ItemResponse,
  toItemResponse,
  UpdateItemRequest,
} from 'src/model/slip-order/item/item.model';
import { Logger } from 'winston';
import { SlipOrderService } from '../slip-order.service';
import { ItemValidation } from './item.validation';
import { CategoryService } from './category/category.service';
import { UnitService } from 'src/unit/unit.service';
import { v4 as uuid } from 'uuid';
import { SlipOrderItem } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private slipOrderService: SlipOrderService,
    private categoryService: CategoryService,
    private unitService: UnitService,
  ) {}

  async getAll(params: ItemParams): Promise<ItemResponse[]> {
    await this.slipOrderService.checkIdIsExist(params.slip_order_id);
    const items = await this.prisma.slipOrderItem.findMany();

    return items.map((item) => toItemResponse(item));
  }

  async create(
    params: ItemParams,
    req: CreateItemRequest,
  ): Promise<ItemResponse> {
    await this.slipOrderService.checkIdIsExist(params.slip_order_id);

    const requestItem: CreateItemRequest = this.validationService.validate(
      ItemValidation.CREATE,
      req,
    );

    await this.categoryService.checkIdIsExist(requestItem.category_id);
    await this.unitService.checkIdIsExist(requestItem.unit_id);

    requestItem.slip_order_id = params.slip_order_id;
    requestItem.id = uuid();
    requestItem.number = await this.generateNumber();

    const item = await this.prisma.slipOrderItem.create({
      data: requestItem,
    });

    return toItemResponse(item);
  }

  async generateNumber(): Promise<string> {
    const lastSlipOrderItem = await this.prisma.slipOrderItem.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    let lastNumber: any;

    if (!lastSlipOrderItem) {
      lastNumber = 1;
    } else {
      lastNumber = parseInt(lastSlipOrderItem.number.substring(2)) + 1;
    }

    return `HW${lastNumber.toString().padStart(6, '0')}`;
  }

  async checkIdIsExist(
    id: string,
    slip_order_id?: string,
  ): Promise<SlipOrderItem> {
    const item = await this.prisma.slipOrderItem.findFirst({
      where: {
        id: id,
        slip_order_id: slip_order_id,
      },
    });

    if (!item) {
      throw new HttpException('Item not found', 404);
    }

    return item;
  }

  async get(params: ItemParams): Promise<ItemResponse> {
    const item = await this.checkIdIsExist(params.id, params.slip_order_id);

    return toItemResponse(item);
  }

  async update(
    params: ItemParams,
    req: UpdateItemRequest,
  ): Promise<ItemResponse> {
    await this.checkIdIsExist(params.id, params.slip_order_id);

    const requestItem: UpdateItemRequest = this.validationService.validate(
      ItemValidation.UPDATE,
      req,
    );

    requestItem.updated_at = new Date();

    if (requestItem.category_id) {
      await this.categoryService.checkIdIsExist(requestItem.category_id);
    }

    if (requestItem.unit_id) {
      await this.unitService.checkIdIsExist(requestItem.unit_id);
    }

    const item = await this.prisma.slipOrderItem.update({
      where: {
        id: params.id,
      },
      data: requestItem,
    });

    return toItemResponse(item);
  }

  async delete(params: ItemParams): Promise<ItemResponse> {
    await this.checkIdIsExist(params.id, params.slip_order_id);

    const item = await this.prisma.slipOrderItem.delete({
      where: {
        id: params.id,
      },
    });

    return toItemResponse(item);
  }
}
