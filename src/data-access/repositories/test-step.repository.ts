import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestStep } from '../entities/test-step.entity';
import {
  TestStepRepositoryPort,
  TestStepData,
} from '../ports/test-step.repository.port';

@Injectable()
export class TestStepRepository extends TestStepRepositoryPort {
  constructor(
    @InjectRepository(TestStep)
    private readonly repo: Repository<TestStep>,
  ) {
    super();
  }

  async upsertMany(records: TestStepData[]): Promise<void> {
    if (records.length === 0) return;
    await this.repo.upsert(records, {
      conflictPaths: ['testCaseId', 'stepNo'],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
