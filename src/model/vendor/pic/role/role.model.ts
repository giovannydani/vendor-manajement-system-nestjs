import { PicRole } from '@prisma/client';

export type PicRoleResponse = {
  id: string;
  name: string;
};

export type CreatePicRoleRequest = {
  id: string;
  name: string;
};

export type UpdatePicRoleRequest = {
  name?: string;
};

export type PicRoleParams = {
  id: string;
};

export function toPicRoleResponse(picRole: PicRole): PicRoleResponse {
  return {
    id: picRole.id,
    name: picRole.name,
  };
}
