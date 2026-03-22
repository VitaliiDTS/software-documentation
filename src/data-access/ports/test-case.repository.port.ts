export interface TestCaseData {
  id: string;
  title: string;
}

export abstract class TestCaseRepositoryPort {
  abstract upsertMany(records: TestCaseData[]): Promise<void>;
}
