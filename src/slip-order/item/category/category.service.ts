import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CategoryParams,
  CategoryResponse,
  CreateCategoryRequest,
  toCategoryResponse,
  UpdateCategoryRequest,
} from 'src/model/slip-order/item/category/category.model';
import { Logger } from 'winston';
import { CategoryValidation } from './category.validation';
import { v4 as uuid } from 'uuid';
import { ItemCategory } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<CategoryResponse[]> {
    const items = await this.prisma.itemCategory.findMany();

    return items.map((item) => toCategoryResponse(item));
  }

  async create(req: CreateCategoryRequest): Promise<CategoryResponse> {
    const requestCategory: CreateCategoryRequest =
      this.validationService.validate(CategoryValidation.CREATE, req);

    requestCategory.id = uuid();

    const category = await this.prisma.itemCategory.create({
      data: requestCategory,
    });

    return toCategoryResponse(category);
  }

  async checkIdIsExist(id: string): Promise<ItemCategory> {
    const category = await this.prisma.itemCategory.findFirst({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    return category;
  }

  async get(params: CategoryParams): Promise<CategoryResponse> {
    const category = await this.checkIdIsExist(params.id);

    return toCategoryResponse(category);
  }

  async update(
    params: CategoryParams,
    req: UpdateCategoryRequest,
  ): Promise<CategoryResponse> {
    await this.checkIdIsExist(params.id);

    const requestCategory: UpdateCategoryRequest =
      this.validationService.validate(CategoryValidation.UPDATE, req);

    const category = await this.prisma.itemCategory.update({
      where: {
        id: params.id,
      },
      data: requestCategory,
    });

    return toCategoryResponse(category);
  }

  async delete(params: CategoryParams): Promise<CategoryResponse> {
    await this.checkIdIsExist(params.id);

    const category = await this.prisma.itemCategory.delete({
      where: {
        id: params.id,
      },
    });

    return toCategoryResponse(category);
  }
}
