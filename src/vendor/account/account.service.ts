import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { VendorService } from '../vendor.service';
import { BankService } from './bank/bank.service';
import {
  AccountParams,
  AccountResponse,
  CreateAccountRequest,
  toAccountResponse,
  UpdateAccountRequest,
} from 'src/model/vendor/account/account.model';
import { AccountValidation } from './account.validation';
import { v4 as uuid } from 'uuid';
import { Account } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private vendorService: VendorService,
    private bankService: BankService,
  ) {}

  async getAll(params: AccountParams): Promise<AccountResponse[]> {
    await this.vendorService.checkIdIsExist(params.vendor_id);

    const accounts = await this.prisma.account.findMany({
      where: {
        vendor_id: params.vendor_id,
      },
    });

    return accounts.map((account) => toAccountResponse(account));
  }

  async create(
    params: AccountParams,
    req: CreateAccountRequest,
  ): Promise<AccountResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);

    const requestAccount: CreateAccountRequest =
      this.validationService.validate(AccountValidation.CREATE, req);

    requestAccount.id = uuid();
    requestAccount.vendor_id = params.vendor_id;

    await this.bankService.checkIdIsExist(requestAccount.bank_id);

    if (req.status === undefined) {
      requestAccount.status = false;
    }

    const account = await this.prisma.account.create({
      data: requestAccount,
    });

    return toAccountResponse(account);
  }

  async checkIdIsExist(id: string, vendor_id?: string): Promise<Account> {
    const account = await this.prisma.account.findFirst({
      where: {
        id: id,
        vendor_id: vendor_id,
      },
    });

    if (!account) {
      throw new HttpException('Account not found', 404);
    }

    return account;
  }

  async get(params: AccountParams): Promise<AccountResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    const account = await this.checkIdIsExist(params.id, params.vendor_id);

    return toAccountResponse(account);
  }

  async update(
    params: AccountParams,
    req: UpdateAccountRequest,
  ): Promise<AccountResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    await this.checkIdIsExist(params.id, params.vendor_id);

    const requestAccount: UpdateAccountRequest =
      this.validationService.validate(AccountValidation.UPDATE, req);

    if (requestAccount.bank_id) {
      await this.bankService.checkIdIsExist(requestAccount.bank_id);
    }

    const updatedAccount = await this.prisma.account.update({
      where: {
        id: params.id,
      },
      data: requestAccount,
    });

    return toAccountResponse(updatedAccount);
  }

  async delete(params: AccountParams): Promise<AccountResponse> {
    await this.vendorService.checkIdIsExist(params.vendor_id);
    await this.checkIdIsExist(params.id, params.vendor_id);

    const account = await this.prisma.account.delete({
      where: {
        id: params.id,
      },
    });

    return toAccountResponse(account);
  }
}
