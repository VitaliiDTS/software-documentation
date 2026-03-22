import { RunStatus } from '../../domain/enums/run-status.enum';

export interface CsvRow {
  testCaseId: string;
  testCaseTitle: string;
  stepNo: number;
  action: string;
  expected: string;
  testRunId: string;
  executedAt: Date;
  runStatus: RunStatus;
  actualResult: string;
  stepStatus: RunStatus;
}

export abstract class CsvReaderPort {
  abstract read(filePath: string): Promise<CsvRow[]>;
}
