import { Vendor } from '@prisma/client';

export type CreateVendorRequest = {
  id: string;
  number: string;
  name: string;
  phone: string;
  notes?: string;
};

export type UpdateVendorRequest = {
  name?: string;
  phone?: string;
  notes?: string;
  updated_at?: Date;
};

export type VendorResponse = {
  id: string;
  number: string;
  name: string;
  phone: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
};

export type VendorParams = {
  id: string;
};

export function toVendorResponse(vendor: Vendor): VendorResponse {
  return {
    id: vendor.id,
    number: vendor.number,
    name: vendor.name,
    phone: vendor.phone,
    notes: vendor.notes ?? undefined,
    created_at: vendor.created_at,
    updated_at: vendor.updated_at,
  };
}
