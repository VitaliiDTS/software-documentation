import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestCase } from '../entities/test-case.entity';
import {
  TestCaseRepositoryPort,
  TestCaseData,
} from '../ports/test-case.repository.port';

@Injectable()
export class TestCaseRepository extends TestCaseRepositoryPort {
  constructor(
    @InjectRepository(TestCase)
    private readonly repo: Repository<TestCase>,
  ) {
    super();
  }

  async upsertMany(records: TestCaseData[]): Promise<void> {
    if (records.length === 0) return;
    await this.repo.upsert(records, { conflictPaths: ['id'], skipUpdateIfNoValuesChanged: true });
  }
}
