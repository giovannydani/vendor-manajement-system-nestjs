import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import {
  CreateUnitRequest,
  UnitParams,
  UpdateUnitRequest,
} from 'src/model/unit/unit.model';

@Controller('unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get()
  async getAll() {
    const response = await this.unitService.getAll();

    return {
      data: response,
    };
  }

  @Post()
  async create(@Body() request: CreateUnitRequest) {
    const response = await this.unitService.create(request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: UnitParams) {
    const response = await this.unitService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: UnitParams,
    @Body() request: UpdateUnitRequest,
  ) {
    const response = await this.unitService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: UnitParams) {
    const response = await this.unitService.delete(params);

    return {
      data: response,
    };
  }
}
