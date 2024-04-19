import { Account, Bank } from '@prisma/client';

export type AccountResponse = {
  id: string;
  number: string;
  name: string;
  bank_branch: string;
  status: boolean;
  bank?: Bank;
};

export type CreateAccountRequest = {
  id: string;
  vendor_id: string;
  bank_id: string;
  number: string;
  name: string;
  bank_branch: string;
  status: boolean | false;
};

export type AccountParams = {
  vendor_id: string;
  id?: string;
};

export type UpdateAccountRequest = {
  vendor_id?: string;
  bank_id?: string;
  number?: string;
  name?: string;
  bank_branch?: string;
  status?: boolean;
};

export function toAccountResponse(account: Account): AccountResponse {
  return {
    id: account.id,
    number: account.number,
    name: account.name,
    bank_branch: account.bank_branch,
    status: account.status,
  };
}
