import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import {
  CreateVendorRequest,
  VendorParams,
} from 'src/model/vendor/vendor.model';

@Controller('vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Get()
  async getAll() {
    const response = await this.vendorService.getAll();

    return {
      data: response,
    };
  }

  @Post()
  async create(@Body() request: CreateVendorRequest) {
    const response = await this.vendorService.create(request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: VendorParams) {
    const response = await this.vendorService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: VendorParams,
    @Body() request: CreateVendorRequest,
  ) {
    const response = await this.vendorService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: VendorParams) {
    const response = await this.vendorService.delete(params);

    return {
      data: response,
    };
  }
}
