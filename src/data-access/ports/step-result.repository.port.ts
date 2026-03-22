import { RunStatus } from '../../domain/enums/run-status.enum';

export interface StepResultData {
  testRunId: string;
  stepNo: number;
  actualResult: string;
  status: RunStatus;
}

export abstract class StepResultRepositoryPort {
  abstract upsertMany(records: StepResultData[]): Promise<void>;
}
