import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { TestStep } from './test-step.entity';
import { TestRun } from './test-run.entity';

@Entity('test_cases')
export class TestCase {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @OneToMany(() => TestStep, (step) => step.testCase)
  steps: TestStep[];

  @OneToMany(() => TestRun, (run) => run.testCase)
  runs: TestRun[];
}
