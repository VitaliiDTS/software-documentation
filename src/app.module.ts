import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCase } from './data-access/entities/test-case.entity';
import { TestStep } from './data-access/entities/test-step.entity';
import { TestRun } from './data-access/entities/test-run.entity';
import { StepResult } from './data-access/entities/step-result.entity';
import { ImportModule } from './presentation/import.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH || 'lab2.db',
      entities: [TestCase, TestStep, TestRun, StepResult],
      synchronize: true,
    }),
    ImportModule,
  ],
})
export class AppModule {}
