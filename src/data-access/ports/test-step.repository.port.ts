export interface TestStepData {
  testCaseId: string;
  stepNo: number;
  action: string;
  expected: string;
}

export abstract class TestStepRepositoryPort {
  abstract upsertMany(records: TestStepData[]): Promise<void>;
}
