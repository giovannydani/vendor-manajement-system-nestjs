import { Departement } from '@prisma/client';

export type DepartementResponse = {
  id: string;
  division_id: string;
  name: string;
};

export function toDepartementResponse(
  departement: Departement,
): DepartementResponse {
  return {
    id: departement.id,
    division_id: departement.division_id,
    name: departement.name,
  };
}

export type CreateDepartementRequest = {
  id: string;
  division_id: string;
  name: string;
};

export type UpdateDepartementRequest = {
  division_id?: string;
  name?: string;
};

export type DepartementParams = {
  division_id: string;
  id?: string;
};
