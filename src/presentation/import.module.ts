import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { ImportController } from './import.controller';

@Module({
  imports: [BusinessModule],
  controllers: [ImportController],
})
export class ImportModule {}
