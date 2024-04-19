import { Bank } from '@prisma/client';

export type BankResponse = {
  id: string;
  name: string;
};

export type CreateBankRequest = {
  id: string;
  name: string;
};

export type BankParams = {
  id: string;
};

export type GetBankRequest = {
  id: string;
};

export type UpdateBankRequest = {
  name: string;
};

export function toBankResponse(bank: Bank): BankResponse {
  return {
    id: bank.id,
    name: bank.name,
  };
}
