import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BankService } from './bank.service';
import {
  BankParams,
  CreateBankRequest,
  UpdateBankRequest,
} from 'src/model/vendor/account/bank/bank.model';

@Controller('vendor/account/bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @Get()
  async getAll() {
    const response = await this.bankService.getAll();

    return {
      data: response,
    };
  }

  @Post()
  async create(@Body() request: CreateBankRequest) {
    const response = await this.bankService.create(request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: BankParams) {
    const response = await this.bankService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: BankParams,
    @Body() request: UpdateBankRequest,
  ) {
    const response = await this.bankService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: BankParams) {
    const response = await this.bankService.delete(params);

    return {
      data: response,
    };
  }
}
