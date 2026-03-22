import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCase } from './entities/test-case.entity';
import { TestStep } from './entities/test-step.entity';
import { TestRun } from './entities/test-run.entity';
import { StepResult } from './entities/step-result.entity';
import { TestCaseRepositoryPort } from './ports/test-case.repository.port';
import { TestStepRepositoryPort } from './ports/test-step.repository.port';
import { TestRunRepositoryPort } from './ports/test-run.repository.port';
import { StepResultRepositoryPort } from './ports/step-result.repository.port';
import { CsvReaderPort } from './ports/csv-reader.port';
import { TestCaseRepository } from './repositories/test-case.repository';
import { TestStepRepository } from './repositories/test-step.repository';
import { TestRunRepository } from './repositories/test-run.repository';
import { StepResultRepository } from './repositories/step-result.repository';
import { CsvReaderService } from './csv/csv-reader.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestCase, TestStep, TestRun, StepResult]),
  ],
  providers: [
    { provide: TestCaseRepositoryPort, useClass: TestCaseRepository },
    { provide: TestStepRepositoryPort, useClass: TestStepRepository },
    { provide: TestRunRepositoryPort, useClass: TestRunRepository },
    { provide: StepResultRepositoryPort, useClass: StepResultRepository },
    { provide: CsvReaderPort, useClass: CsvReaderService },
  ],
  exports: [
    TestCaseRepositoryPort,
    TestStepRepositoryPort,
    TestRunRepositoryPort,
    StepResultRepositoryPort,
    CsvReaderPort,
  ],
})
export class DataAccessModule {}
