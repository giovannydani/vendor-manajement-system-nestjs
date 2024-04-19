import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PicService } from './pic.service';
import { CreatePicRequest, PicParams } from 'src/model/vendor/pic/pic.model';

@Controller('vendor/:vendor_id/pic')
export class PicController {
  constructor(private picService: PicService) {}

  @Get()
  async getAll(@Param() params: PicParams) {
    const response = await this.picService.getAll(params);

    return {
      data: response,
    };
  }

  @Post()
  async create(@Param() params: PicParams, @Body() request: CreatePicRequest) {
    const response = await this.picService.create(params, request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: PicParams) {
    const response = await this.picService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(@Param() params: PicParams, @Body() request: CreatePicRequest) {
    const response = await this.picService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: PicParams) {
    const response = await this.picService.delete(params);

    return {
      data: response,
    };
  }
}
