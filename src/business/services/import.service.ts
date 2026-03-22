import { Injectable, Logger } from '@nestjs/common';
import { CsvReaderPort, CsvRow } from '../../data-access/ports/csv-reader.port';
import {
  TestCaseRepositoryPort,
  TestCaseData,
} from '../../data-access/ports/test-case.repository.port';
import {
  TestStepRepositoryPort,
  TestStepData,
} from '../../data-access/ports/test-step.repository.port';
import {
  TestRunRepositoryPort,
  TestRunData,
} from '../../data-access/ports/test-run.repository.port';
import {
  StepResultRepositoryPort,
  StepResultData,
} from '../../data-access/ports/step-result.repository.port';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);

  constructor(
    private readonly csvReader: CsvReaderPort,
    private readonly testCaseRepo: TestCaseRepositoryPort,
    private readonly testStepRepo: TestStepRepositoryPort,
    private readonly testRunRepo: TestRunRepositoryPort,
    private readonly stepResultRepo: StepResultRepositoryPort,
  ) {}

  async importFromCsv(filePath: string): Promise<void> {
    this.logger.log(`Reading CSV from: ${filePath}`);
    const rows: CsvRow[] = await this.csvReader.read(filePath);
    this.logger.log(`Read ${rows.length} rows, deduplicating...`);

    const testCasesMap = new Map<string, TestCaseData>();
    const testStepsMap = new Map<string, TestStepData>();
    const testRunsMap = new Map<string, TestRunData>();
    const stepResultsMap = new Map<string, StepResultData>();

    for (const row of rows) {
      // Deduplicate TestCase by id
      if (!testCasesMap.has(row.testCaseId)) {
        testCasesMap.set(row.testCaseId, {
          id: row.testCaseId,
          title: row.testCaseTitle,
        });
      }

      // Deduplicate TestStep by (testCaseId, stepNo)
      const stepKey = `${row.testCaseId}:${row.stepNo}`;
      if (!testStepsMap.has(stepKey)) {
        testStepsMap.set(stepKey, {
          testCaseId: row.testCaseId,
          stepNo: row.stepNo,
          action: row.action,
          expected: row.expected,
        });
      }

      // Deduplicate TestRun by id
      if (!testRunsMap.has(row.testRunId)) {
        testRunsMap.set(row.testRunId, {
          id: row.testRunId,
          executedAt: row.executedAt,
          status: row.runStatus,
          testCaseId: row.testCaseId,
        });
      }

      // Deduplicate StepResult by (testRunId, stepNo)
      const resultKey = `${row.testRunId}:${row.stepNo}`;
      if (!stepResultsMap.has(resultKey)) {
        stepResultsMap.set(resultKey, {
          testRunId: row.testRunId,
          stepNo: row.stepNo,
          actualResult: row.actualResult,
          status: row.stepStatus,
        });
      }
    }

    this.logger.log(
      `Saving: ${testCasesMap.size} test cases, ${testStepsMap.size} test steps, ` +
        `${testRunsMap.size} test runs, ${stepResultsMap.size} step results`,
    );

    // Save in dependency order:
    // 1. TestCase (no deps)
    await this.testCaseRepo.upsertMany([...testCasesMap.values()]);
    this.logger.log('TestCases saved');

    // 2. TestStep and TestRun both depend only on TestCase — can be parallel
    await Promise.all([
      this.testStepRepo.upsertMany([...testStepsMap.values()]),
      this.testRunRepo.upsertMany([...testRunsMap.values()]),
    ]);
    this.logger.log('TestSteps and TestRuns saved');

    // 3. StepResult depends on TestRun
    await this.stepResultRepo.upsertMany([...stepResultsMap.values()]);
    this.logger.log('StepResults saved');

    this.logger.log('Import complete.');
  }
}
