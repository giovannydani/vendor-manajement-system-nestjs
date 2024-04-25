import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import {
  CreateQuotationRequest,
  QuotationParams,
} from 'src/model/slip-order/item/quotation/quotation.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Controller('slip-order/:slip_order_id/item/:item_id/quotation')
export class QuotationController {
  constructor(private quotationService: QuotationService) {}

  @Get()
  async getAll(@Param() params: QuotationParams) {
    const response = await this.quotationService.getAll(params);

    return {
      data: response,
    };
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          cb(null, uuid() + extname(file.originalname));
        },
        destination: (req, file, cb) => {
          cb(null, './uploads/tmp/');
        },
      }),
    }),
  )
  @Post()
  async create(
    @Param() params: QuotationParams,
    @Body() request: CreateQuotationRequest,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'pdf' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const response = await this.quotationService.create(params, request, file);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: QuotationParams) {
    const response = await this.quotationService.get(params);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: QuotationParams) {
    const response = await this.quotationService.delete(params);

    return {
      data: response,
    };
  }
}
