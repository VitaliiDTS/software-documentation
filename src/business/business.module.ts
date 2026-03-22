import { Module } from '@nestjs/common';
import { DataAccessModule } from '../data-access/data-access.module';
import { ImportService } from './services/import.service';

@Module({
  imports: [DataAccessModule],
  providers: [ImportService],
  exports: [ImportService],
})
export class BusinessModule {}
