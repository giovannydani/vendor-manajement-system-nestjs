// id String @id @db.VarChar(100)
// departement_id String @db.VarChar(100)
// division_id String @db.VarChar(100)
// number String @db.VarChar(12) @unique
// requester String @db.VarChar(100)
// recived_date DateTime @db.Date
// request_type String @db.VarChar(100)
// status String @db.VarChar(100)
// file String? @db.VarChar(255)
// created_at DateTime @db.Timestamp() @default(now())
// updated_at DateTime @db.Timestamp() @default(now())

import { SlipOrder } from '@prisma/client';

export type SlipOrderResponse = {
  id: string;
  departement_id: string;
  division_id: string;
  number: string;
  requester: string;
  recived_date: Date;
  request_type: string;
  status: string;
  file?: string;
  file_path?: string;
  original_file_name?: string;
  created_at: Date;
  updated_at: Date;
};

export function toSlipOrderResponse(slipOrder: SlipOrder): SlipOrderResponse {
  return {
    id: slipOrder.id,
    departement_id: slipOrder.departement_id,
    division_id: slipOrder.division_id,
    number: slipOrder.number,
    requester: slipOrder.requester,
    recived_date: slipOrder.recived_date,
    request_type: slipOrder.request_type,
    status: slipOrder.status,
    file: slipOrder.file,
    file_path: slipOrder.file_path,
    original_file_name: slipOrder.original_file_name,
    created_at: slipOrder.created_at,
    updated_at: slipOrder.updated_at,
  };
}

export type CreateSlipOrderRequest = {
  id: string;
  departement_id: string;
  division_id: string;
  number: string;
  requester: string;
  recived_date: Date | string;
  request_type: string;
  status: string;
  file?: string;
  file_path?: string;
  original_file_name?: string;
};

export type UpdateSlipOrderRequest = {
  departement_id?: string;
  division_id?: string;
  requester?: string;
  recived_date?: Date | string;
  request_type?: string;
  status?: string;
  file?: string;
  file_path?: string;
  original_file_name?: string;
  updated_at?: Date;
};

export enum SlipOrderRequestType {
  NEW = 'new',
  RENEW = 'renew',
}

export type SlipOrderParams = {
  id: string;
};
