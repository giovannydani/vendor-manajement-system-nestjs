import { Controller, Get } from '@nestjs/common';
import { DepartementService } from './departement.service';

@Controller('departement')
export class DepartementController {
  constructor(private departementService: DepartementService) {}

  @Get()
  async getAll() {
    const response = await this.departementService.getAll();

    return {
      data: response,
    };
  }
}
