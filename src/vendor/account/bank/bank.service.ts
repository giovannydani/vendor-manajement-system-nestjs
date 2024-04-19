import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  BankParams,
  BankResponse,
  CreateBankRequest,
  toBankResponse,
  UpdateBankRequest,
} from 'src/model/vendor/account/bank/bank.model';
import { Logger } from 'winston';
import { BankValidation } from './bank.validation';
import { v4 as uuid } from 'uuid';
import { Bank } from '@prisma/client';

@Injectable()
export class BankService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getAll(): Promise<BankResponse[]> {
    const banks = await this.prisma.bank.findMany();

    return banks.map((bank) => toBankResponse(bank));
  }

  async create(req: CreateBankRequest): Promise<BankResponse> {
    const requestBank = this.validationService.validate(
      BankValidation.CREATE,
      req,
    );

    requestBank.id = uuid();

    const bank = await this.prisma.bank.create({
      data: requestBank,
    });

    return toBankResponse(bank);
  }

  async checkIdIsExist(id: string): Promise<Bank> {
    const bank = await this.prisma.bank.findFirst({
      where: {
        id,
      },
    });

    if (!bank) {
      throw new HttpException('Bank not found', 404);
    }

    return bank;
  }

  async get(params: BankParams): Promise<BankResponse> {
    const bank = await this.checkIdIsExist(params.id);

    return toBankResponse(bank);
  }

  async update(
    params: BankParams,
    req: UpdateBankRequest,
  ): Promise<BankResponse> {
    await this.checkIdIsExist(params.id);

    const requestBank: UpdateBankRequest = this.validationService.validate(
      BankValidation.UPDATE,
      req,
    );

    const bank = await this.prisma.bank.update({
      where: {
        id: params.id,
      },
      data: requestBank,
    });

    return toBankResponse(bank);
  }

  async delete(params: BankParams): Promise<BankResponse> {
    await this.checkIdIsExist(params.id);

    const bank = await this.prisma.bank.delete({
      where: {
        id: params.id,
      },
    });

    return toBankResponse(bank);
  }
}
