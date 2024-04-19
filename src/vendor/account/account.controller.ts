import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  AccountParams,
  CreateAccountRequest,
  UpdateAccountRequest,
} from 'src/model/vendor/account/account.model';

@Controller('vendor/:vendor_id/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAll(@Param() params: AccountParams) {
    const response = await this.accountService.getAll(params);

    return {
      data: response,
    };
  }

  @Post()
  async create(
    @Param() params: AccountParams,
    @Body() request: CreateAccountRequest,
  ) {
    const response = await this.accountService.create(params, request);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: AccountParams) {
    const response = await this.accountService.get(params);

    return {
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: AccountParams,
    @Body() request: UpdateAccountRequest,
  ) {
    const response = await this.accountService.update(params, request);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: AccountParams) {
    const response = await this.accountService.delete(params);

    return {
      data: response,
    };
  }
}
