/**
 * Import Runner Script
 * Usage: npm run import [csv-file-path]
 * Default path: data/test-data.csv
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ImportService } from '../src/business/services/import.service';
import { join } from 'path';

async function main() {
  const filePath = process.argv[2] || join(process.cwd(), 'data', 'test-data.csv');

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const importService = app.get(ImportService);

  try {
    await importService.importFromCsv(filePath);
  } finally {
    await app.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
