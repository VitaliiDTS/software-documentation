import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IssueStatus } from './enums/issue-status.enum';
import { IssuePriority } from './enums/issue-priority.enum';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  // Status: 'To Do' | 'In Progress' | 'Done'
  @Column({ type: 'varchar' })
  status: IssueStatus;

  // Priority: 'Low' | 'Medium' | 'High'
  @Column({ type: 'varchar' })
  priority: IssuePriority;

  @Column()
  assigneeName: string;

  @Column()
  projectName: string;

  // Automatically set on creation
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  dueDate: Date | null;

  // Optional: story points estimate (Jira-specific field)
  @Column({ type: 'int', nullable: true })
  storyPoints: number | null;
}
