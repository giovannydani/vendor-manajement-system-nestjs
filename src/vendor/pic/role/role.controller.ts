import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreatePicRoleRequest,
  PicRoleParams,
  UpdatePicRoleRequest,
} from 'src/model/vendor/pic/role/role.model';

@Controller('vendor/pic/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAll() {
    const response = await this.roleService.getAll();

    return {
      data: response,
    };
  }

  @Post()
  async create(@Body() request: CreatePicRoleRequest) {
    const response = await this.roleService.create(request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: PicRoleParams) {
    const response = await this.roleService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: PicRoleParams,
    @Body() request: UpdatePicRoleRequest,
  ) {
    const response = await this.roleService.update(request, params);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: PicRoleParams) {
    const response = await this.roleService.delete(params);

    return {
      data: response,
    };
  }
}
