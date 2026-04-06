import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from '../models/issue.entity';

@Injectable()
export class IssueRepository {
  constructor(
    @InjectRepository(Issue)
    private readonly repo: Repository<Issue>,
  ) {}

  async findAll(search?: string, status?: string): Promise<Issue[]> {
    const qb = this.repo.createQueryBuilder('issue');

    if (search) {
      qb.andWhere('LOWER(issue.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (status) {
      qb.andWhere('issue.status = :status', { status });
    }

    return qb.orderBy('issue.createdAt', 'DESC').getMany();
  }

  async findById(id: number): Promise<Issue | null> {
    return this.repo.findOneBy({ id });
  }

  async create(data: Partial<Issue>): Promise<Issue> {
    const issue = this.repo.create(data);
    return this.repo.save(issue);
  }

  async update(id: number, data: Partial<Issue>): Promise<Issue | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
