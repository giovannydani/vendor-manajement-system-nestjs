import { ItemCategory } from '@prisma/client';

export type CategoryResponse = {
  id: string;
  name: string;
};

export type CreateCategoryRequest = {
  id: string;
  name: string;
};

export type GetCategoryRequest = {
  id: string;
};

export type UpdateCategoryRequest = {
  name?: string;
};

export type CategoryParams = {
  id: string;
};

export function toCategoryResponse(
  itemCategory: ItemCategory,
): CategoryResponse {
  return {
    id: itemCategory.id,
    name: itemCategory.name,
  };
}
