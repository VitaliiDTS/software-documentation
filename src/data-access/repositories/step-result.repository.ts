import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepResult } from '../entities/step-result.entity';
import {
  StepResultRepositoryPort,
  StepResultData,
} from '../ports/step-result.repository.port';

@Injectable()
export class StepResultRepository extends StepResultRepositoryPort {
  constructor(
    @InjectRepository(StepResult)
    private readonly repo: Repository<StepResult>,
  ) {
    super();
  }

  async upsertMany(records: StepResultData[]): Promise<void> {
    if (records.length === 0) return;
    await this.repo.upsert(records, {
      conflictPaths: ['testRunId', 'stepNo'],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
