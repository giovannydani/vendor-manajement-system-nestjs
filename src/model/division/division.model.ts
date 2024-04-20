import { Division } from '@prisma/client';

export type DivisionResponse = {
  id: string;
  name: string;
};

export function toDivisionResponse(division: Division): DivisionResponse {
  return {
    id: division.id,
    name: division.name,
  };
}

export type CreateDivisionRequest = {
  id: string;
  name: string;
};

export type UpdateDivisionRequest = {
  name?: string;
};

export type DivisionParams = {
  id: string;
};
