import { Controller, Post, Body } from '@nestjs/common';
import { ImportService } from '../business/services/import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  async import(@Body('filePath') filePath: string): Promise<{ message: string }> {
    await this.importService.importFromCsv(filePath);
    return { message: 'Import complete' };
  }
}
