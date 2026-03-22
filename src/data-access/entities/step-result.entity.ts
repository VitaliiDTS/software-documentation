import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RunStatus } from '../../domain/enums/run-status.enum';
import { TestRun } from './test-run.entity';

@Entity('step_results')
export class StepResult {
  @PrimaryColumn()
  testRunId: string;

  @PrimaryColumn()
  stepNo: number;

  @Column()
  actualResult: string;

  @Column({ type: 'simple-enum', enum: RunStatus })
  status: RunStatus;

  @ManyToOne(() => TestRun, (tr) => tr.stepResults, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testRunId' })
  testRun: TestRun;
}
