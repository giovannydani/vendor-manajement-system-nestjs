import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DivisionService } from './division.service';
import {
  CreateDivisionRequest,
  DivisionParams,
  UpdateDivisionRequest,
} from 'src/model/division/division.model';

@Controller('division')
export class DivisionController {
  constructor(private divisionService: DivisionService) {}

  @Get()
  async getAll() {
    const response = await this.divisionService.getAll();

    return {
      data: response,
    };
  }

  @Post()
  async create(@Body() request: CreateDivisionRequest) {
    const response = await this.divisionService.create(request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: DivisionParams) {
    const response = await this.divisionService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: DivisionParams,
    @Body() request: UpdateDivisionRequest,
  ) {
    const response = await this.divisionService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: DivisionParams) {
    const response = await this.divisionService.delete(params);

    return {
      data: response,
    };
  }
}
