import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RunStatus } from '../../domain/enums/run-status.enum';
import { TestCase } from './test-case.entity';
import { StepResult } from './step-result.entity';

@Entity('test_runs')
export class TestRun {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'datetime' })
  executedAt: Date;

  @Column({ type: 'simple-enum', enum: RunStatus })
  status: RunStatus;

  @Column()
  testCaseId: string;

  @ManyToOne(() => TestCase, (tc) => tc.runs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testCaseId' })
  testCase: TestCase;

  @OneToMany(() => StepResult, (sr) => sr.testRun, { cascade: true })
  stepResults: StepResult[];
}
