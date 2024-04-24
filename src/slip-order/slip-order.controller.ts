import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SlipOrderService } from './slip-order.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import {
  CreateSlipOrderRequest,
  SlipOrderParams,
  UpdateSlipOrderRequest,
} from 'src/model/slip-order/slip-order.model';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('slip-order')
export class SlipOrderController {
  constructor(private slipOrderService: SlipOrderService) {}

  @Get()
  async getAll() {
    const response = await this.slipOrderService.getAll();

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
    @Body() req: CreateSlipOrderRequest,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'pdf' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const response = await this.slipOrderService.create(req, file);

    return {
      data: response,
    };
  }

  @Get(':id')
  async get(@Param() params: SlipOrderParams) {
    const response = await this.slipOrderService.get(params);

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
  @Patch(':id')
  async update(
    @Param() params: SlipOrderParams,
    @Body() request: UpdateSlipOrderRequest,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'pdf' })
        .build({ fileIsRequired: false }),
    )
    file?: Express.Multer.File,
  ) {
    const response = await this.slipOrderService.update(params, request, file);

    return {
      data: response,
    };
  }

  @Delete(':id')
  async delete(@Param() params: SlipOrderParams) {
    const response = await this.slipOrderService.delete(params);

    return {
      data: response,
    };
  }

  @Get('file/:id')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Param() params: SlipOrderParams,
  ) {
    const slipOrder = await this.slipOrderService.getFile(params);
    const file = createReadStream(slipOrder.file);
    res.set({
      'Content-Disposition': `attachment; filename="${slipOrder.original_file_name}"`,
    });

    return new StreamableFile(file);
  }
}
