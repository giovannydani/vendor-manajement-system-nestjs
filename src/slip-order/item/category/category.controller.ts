import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CategoryParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'src/model/slip-order/item/category/category.model';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAll() {
    const response = await this.categoryService.getAll();

    return {
      data: response,
    };
  }

  @Post()
  async create(@Body() request: CreateCategoryRequest) {
    const response = await this.categoryService.create(request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: CategoryParams) {
    const response = await this.categoryService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: CategoryParams,
    @Body() request: UpdateCategoryRequest,
  ) {
    const response = await this.categoryService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: CategoryParams) {
    const response = await this.categoryService.delete(params);

    return {
      data: response,
    };
  }
}
