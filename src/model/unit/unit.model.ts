import { Unit } from '@prisma/client';

export type UnitResponse = {
  id: string;
  name: string;
};

export function toUnitResponse(unit: Unit): UnitResponse {
  return {
    id: unit.id,
    name: unit.name,
  };
}

export type CreateUnitRequest = {
  id: string;
  name: string;
};

export type UpdateUnitRequest = {
  name?: string;
};

export type UnitParams = {
  id: string;
};
