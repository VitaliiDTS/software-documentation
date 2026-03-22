import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestRun } from '../entities/test-run.entity';
import {
  TestRunRepositoryPort,
  TestRunData,
} from '../ports/test-run.repository.port';

@Injectable()
export class TestRunRepository extends TestRunRepositoryPort {
  constructor(
    @InjectRepository(TestRun)
    private readonly repo: Repository<TestRun>,
  ) {
    super();
  }

  async upsertMany(records: TestRunData[]): Promise<void> {
    if (records.length === 0) return;
    await this.repo.upsert(records, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
