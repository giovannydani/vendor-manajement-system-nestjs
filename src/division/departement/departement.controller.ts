import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartementService } from './departement.service';
import {
  CreateDepartementRequest,
  DepartementParams,
  UpdateDepartementRequest,
} from 'src/model/division/departement/departement.model';

@Controller('division/:division_id/departement')
export class DepartementController {
  constructor(private departementService: DepartementService) {}

  @Get()
  async getAll(@Param() params: DepartementParams) {
    const response = await this.departementService.getAll(params);

    return {
      data: response,
    };
  }

  @Post()
  async create(
    @Param() params: DepartementParams,
    @Body() request: CreateDepartementRequest,
  ) {
    const response = await this.departementService.create(params, request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: DepartementParams) {
    const response = await this.departementService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: DepartementParams,
    @Body() request: UpdateDepartementRequest,
  ) {
    const response = await this.departementService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: DepartementParams) {
    const response = await this.departementService.delete(params);

    return {
      data: response,
    };
  }
}
