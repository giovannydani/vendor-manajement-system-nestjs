import { SlipOrderItem } from '@prisma/client';

export type ItemParams = {
  slip_order_id: string;
  id?: string;
};

export type ItemResponse = {
  id: string;
  slip_order_id: string;
  category_id: string;
  unit_id: string;
  number: string;
  quantity: number;
  name: string;
  detail: string;
  created_at: Date;
  updated_at: Date;
};

export function toItemResponse(slipOrderItem: SlipOrderItem): ItemResponse {
  return {
    id: slipOrderItem.id,
    slip_order_id: slipOrderItem.slip_order_id,
    category_id: slipOrderItem.category_id,
    unit_id: slipOrderItem.unit_id,
    number: slipOrderItem.number,
    quantity: slipOrderItem.quantity,
    name: slipOrderItem.name,
    detail: slipOrderItem.detail,
    created_at: slipOrderItem.created_at,
    updated_at: slipOrderItem.updated_at,
  };
}

export type CreateItemRequest = {
  id: string;
  slip_order_id: string;
  category_id: string;
  unit_id: string;
  number: string;
  quantity: number;
  name: string;
  detail: string;
};

export type UpdateItemRequest = {
  category_id?: string;
  unit_id?: string;
  quantity?: number;
  name?: string;
  detail?: string;
  updated_at?: Date;
};
