import { RunStatus } from '../../domain/enums/run-status.enum';

export interface TestRunData {
  id: string;
  executedAt: Date;
  status: RunStatus;
  testCaseId: string;
}

export abstract class TestRunRepositoryPort {
  abstract upsertMany(records: TestRunData[]): Promise<void>;
}
