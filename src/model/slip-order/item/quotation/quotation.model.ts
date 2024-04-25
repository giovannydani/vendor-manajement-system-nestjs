import { Quotation } from '@prisma/client';

export type QuotationParams = {
  id?: string;
  slip_order_id: string;
  item_id: string;
};

export type QuotationResponse = {
  id: string;
  item_id: string;
  vendor_id: string;
  unit_id: string;
  number: string;
  recived_date: Date;
  request_date: Date;
  price: number;
  status: string;
  quotation?: number;
  quantity: number;
  total_price: number;
  notes: string;
  file: string;
  file_path: string;
  original_file_name: string;
  created_at: Date;
  updated_at: Date;
};

export function toQuotationResponse(quotation: Quotation): QuotationResponse {
  return {
    id: quotation.id,
    item_id: quotation.item_id,
    vendor_id: quotation.vendor_id,
    unit_id: quotation.unit_id,
    number: quotation.number,
    recived_date: quotation.recived_date,
    request_date: quotation.request_date,
    price: quotation.price,
    status: quotation.status,
    quotation: quotation.quotation || undefined,
    quantity: quotation.quantity,
    total_price: quotation.price * quotation.quantity,
    notes: quotation.notes,
    file: quotation.file,
    file_path: quotation.file_path,
    original_file_name: quotation.original_file_name,
    created_at: quotation.created_at,
    updated_at: quotation.updated_at,
  };
}

export type CreateQuotationRequest = {
  id: string;
  item_id: string;
  vendor_id: string;
  unit_id: string;
  number: string;
  recived_date: Date | string;
  request_date: Date | string;
  price: number;
  status: string;
  quotation?: number;
  quantity: number;
  total_price: number;
  notes: string;
  file: string;
  file_path: string;
  original_file_name: string;
};

export type UpdateQuotationRequest = {
  vendor_id?: string;
  unit_id?: string;
  number?: string;
  recived_date?: Date | string;
  request_date?: Date | string;
  price?: number;
  status?: string;
  quotation?: number;
  quantity?: number;
  total_price?: number;
  notes?: string;
  file?: string;
  file_path?: string;
  original_file_name?: string;
  updated_at?: Date;
};
