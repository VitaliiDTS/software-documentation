import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IssueService } from '../services/issue.service';
import { IssueStatus } from '../models/enums/issue-status.enum';
import { IssuePriority } from '../models/enums/issue-priority.enum';

const ALL_STATUSES = Object.values(IssueStatus);
const ALL_PRIORITIES = Object.values(IssuePriority);

function parseId(raw: string): number {
  return parseInt(raw, 10);
}

function bodyToIssueData(body: Record<string, string>) {
  return {
    title: body.title,
    description: body.description,
    status: body.status as IssueStatus,
    priority: body.priority as IssuePriority,
    assigneeName: body.assigneeName,
    projectName: body.projectName,
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    storyPoints: body.storyPoints ? parseInt(body.storyPoints, 10) : null,
  };
}

@Controller('issues')
export class IssuesController {
  constructor(private readonly issueService: IssueService) {}

  @Get()
  async index(
    @Query('search') search: string,
    @Query('status') status: string,
    @Res() res: Response,
  ) {
    const issues = await this.issueService.getAll(search, status);
    return res.render('issues/index', {
      issues,
      search: search || '',
      selectedStatus: status || '',
      statuses: ALL_STATUSES,
    });
  }

  @Get('create')
  createForm(@Res() res: Response) {
    return res.render('issues/create', {
      statuses: ALL_STATUSES,
      priorities: ALL_PRIORITIES,
    });
  }

  @Post('create')
  async create(@Body() body: Record<string, string>, @Res() res: Response) {
    try {
      await this.issueService.create(bodyToIssueData(body));
      return res.redirect('/issues');
    } catch (error: unknown) {
      return res.render('issues/create', {
        statuses: ALL_STATUSES,
        priorities: ALL_PRIORITIES,
        error: error instanceof Error ? error.message : 'An error occurred',
        formData: body,
      });
    }
  }

  @Get(':id')
  async details(@Param('id') id: string, @Res() res: Response) {
    const numId = parseId(id);
    if (isNaN(numId)) return res.redirect('/issues');
    try {
      const issue = await this.issueService.getById(numId);
      return res.render('issues/details', { issue });
    } catch {
      return res.redirect('/issues');
    }
  }

  @Get(':id/edit')
  async editForm(@Param('id') id: string, @Res() res: Response) {
    const numId = parseId(id);
    if (isNaN(numId)) return res.redirect('/issues');
    try {
      const issue = await this.issueService.getById(numId);
      return res.render('issues/edit', {
        issue,
        statuses: ALL_STATUSES,
        priorities: ALL_PRIORITIES,
      });
    } catch {
      return res.redirect('/issues');
    }
  }

  @Post(':id/edit')
  async edit(
    @Param('id') id: string,
    @Body() body: Record<string, string>,
    @Res() res: Response,
  ) {
    const numId = parseId(id);
    if (isNaN(numId)) return res.redirect('/issues');
    try {
      await this.issueService.update(numId, bodyToIssueData(body));
      return res.redirect('/issues');
    } catch (error: unknown) {
      const issue = await this.issueService.getById(numId).catch(() => null);
      return res.render('issues/edit', {
        issue: { ...issue, ...body, id: numId },
        statuses: ALL_STATUSES,
        priorities: ALL_PRIORITIES,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }

  @Get(':id/delete')
  async deleteForm(@Param('id') id: string, @Res() res: Response) {
    const numId = parseId(id);
    if (isNaN(numId)) return res.redirect('/issues');
    try {
      const issue = await this.issueService.getById(numId);
      return res.render('issues/delete', { issue });
    } catch {
      return res.redirect('/issues');
    }
  }

  @Post(':id/delete')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const numId = parseId(id);
    if (!isNaN(numId)) {
      await this.issueService.delete(numId).catch(() => null);
    }
    return res.redirect('/issues');
  }
}
