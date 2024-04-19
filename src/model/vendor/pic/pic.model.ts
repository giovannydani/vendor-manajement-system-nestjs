import { Pic } from '@prisma/client';

export type PicResponse = {
  id: string;
  vendor_id: string;
  role_id: string;
  name: string;
  phone: string;
  email: string;
  default: boolean;
};

export type PicParams = {
  id?: string;
  vendor_id: string;
};

export type CreatePicRequest = {
  id: string;
  vendor_id: string;
  role_id: string;
  name: string;
  phone: string;
  email: string;
  default: boolean;
};

export type UpdatePicRequest = {
  role_id?: string;
  name?: string;
  phone?: string;
  email?: string;
  default?: boolean;
};

export function toPicResponse(pic: Pic): PicResponse {
  return {
    id: pic.id,
    vendor_id: pic.vendor_id,
    role_id: pic.role_id,
    name: pic.name,
    phone: pic.phone,
    email: pic.email,
    default: pic.default,
  };
}
