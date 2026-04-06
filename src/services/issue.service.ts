import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IssueRepository } from '../data-access/issue.repository';
import { Issue } from '../models/issue.entity';
import { IssueStatus } from '../models/enums/issue-status.enum';
import { IssuePriority } from '../models/enums/issue-priority.enum';

@Injectable()
export class IssueService {
  constructor(private readonly issueRepository: IssueRepository) {}

  async getAll(search?: string, status?: string): Promise<Issue[]> {
    return this.issueRepository.findAll(search, status);
  }

  async getById(id: number): Promise<Issue> {
    const issue = await this.issueRepository.findById(id);
    if (!issue) {
      throw new NotFoundException(`Issue #${id} not found`);
    }
    return issue;
  }

  async create(data: Partial<Issue>): Promise<Issue> {
    this.validateIssueData(data);
    return this.issueRepository.create(data);
  }

  async update(id: number, data: Partial<Issue>): Promise<Issue | null> {
    await this.getById(id);
    this.validateIssueData(data);
    return this.issueRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.issueRepository.delete(id);
  }

  private validateIssueData(data: Partial<Issue>): void {
    if (!data.title?.trim()) {
      throw new BadRequestException('Title is required');
    }
    if (!data.description?.trim() || data.description.trim().length < 10) {
      throw new BadRequestException(
        'Description is required (minimum 10 characters)',
      );
    }
    if (!Object.values(IssueStatus).includes(data.status as IssueStatus)) {
      throw new BadRequestException('Invalid status value');
    }
    if (
      !Object.values(IssuePriority).includes(data.priority as IssuePriority)
    ) {
      throw new BadRequestException('Invalid priority value');
    }
    if (!data.assigneeName?.trim()) {
      throw new BadRequestException('Assignee name is required');
    }
    if (!data.projectName?.trim()) {
      throw new BadRequestException('Project name is required');
    }
    if (data.storyPoints !== null && data.storyPoints !== undefined) {
      if (!Number.isInteger(data.storyPoints) || data.storyPoints < 1 || data.storyPoints > 100) {
        throw new BadRequestException('Story points must be an integer between 1 and 100');
      }
    }
  }
}
