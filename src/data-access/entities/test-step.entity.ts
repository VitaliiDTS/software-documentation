import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TestCase } from './test-case.entity';

@Entity('test_steps')
export class TestStep {
  @PrimaryColumn()
  testCaseId: string;

  @PrimaryColumn()
  stepNo: number;

  @Column()
  action: string;

  @Column()
  expected: string;

  @ManyToOne(() => TestCase, (tc) => tc.steps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testCaseId' })
  testCase: TestCase;
}
