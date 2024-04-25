import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import {
  CreateItemRequest,
  ItemParams,
  UpdateItemRequest,
} from 'src/model/slip-order/item/item.model';

@Controller('slip-order/:slip_order_id/item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  async getAll(@Param() params: ItemParams) {
    const response = await this.itemService.getAll(params);

    return {
      data: response,
    };
  }

  @Post()
  async create(
    @Param() params: ItemParams,
    @Body() request: CreateItemRequest,
  ) {
    const response = await this.itemService.create(params, request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: ItemParams) {
    const response = await this.itemService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: ItemParams,
    @Body() request: UpdateItemRequest,
  ) {
    const response = await this.itemService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: ItemParams) {
    const response = await this.itemService.delete(params);

    return {
      data: response,
    };
  }
}
