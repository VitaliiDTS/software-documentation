import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IssueRepository } from '../data-access/issue.repository';
import { IssueStatus } from '../models/enums/issue-status.enum';
import { IssuePriority } from '../models/enums/issue-priority.enum';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly issueRepository: IssueRepository) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      const count = await this.issueRepository.count();
      if (count === 0) {
        await this.seedIssues();
        console.log('Database seeded with test issues.');
      }
    } catch (error: unknown) {
      console.error('Failed to seed database:', error instanceof Error ? error.message : error);
    }
  }

  private async seedIssues(): Promise<void> {
    const issues = [
      {
        title: 'Set up project repository and CI/CD pipeline',
        description:
          'Initialize Git repository, configure GitHub Actions for automated builds and deployments to staging environment.',
        status: IssueStatus.Done,
        priority: IssuePriority.High,
        assigneeName: 'Alice Johnson',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-03-15'),
        storyPoints: 5,
      },
      {
        title: 'Design database schema for user management',
        description:
          'Create ERD diagram and TypeORM entities for users, roles, and permissions. Review with the team before implementation.',
        status: IssueStatus.Done,
        priority: IssuePriority.High,
        assigneeName: 'Bob Smith',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-03-20'),
        storyPoints: 8,
      },
      {
        title: 'Implement JWT authentication middleware',
        description:
          'Build authentication service with JWT tokens, refresh token rotation, and secure cookie storage. Must follow OWASP guidelines.',
        status: IssueStatus.InProgress,
        priority: IssuePriority.High,
        assigneeName: 'Alice Johnson',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-04-10'),
        storyPoints: 13,
      },
      {
        title: 'Create REST API endpoints for issue tracker',
        description:
          'Implement CRUD endpoints for issues, projects, and users. Include pagination, filtering, and sorting support.',
        status: IssueStatus.InProgress,
        priority: IssuePriority.Medium,
        assigneeName: 'Carol White',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-04-15'),
        storyPoints: 8,
      },
      {
        title: 'Write unit tests for authentication module',
        description:
          'Cover all edge cases for login, token refresh, and logout flows. Aim for 80% code coverage minimum.',
        status: IssueStatus.ToDo,
        priority: IssuePriority.Medium,
        assigneeName: 'Bob Smith',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-04-20'),
        storyPoints: 5,
      },
      {
        title: 'Fix layout bug on login page for Safari',
        description:
          'The login form fields are misaligned on Safari 17+. Flexbox issue with the input container. Reported by QA team.',
        status: IssueStatus.ToDo,
        priority: IssuePriority.Low,
        assigneeName: 'Dave Brown',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-04-30'),
        storyPoints: 2,
      },
      {
        title: 'Migrate legacy customer data to new schema',
        description:
          'Write migration scripts to transfer 500k records from the old MySQL schema to the new PostgreSQL structure without data loss.',
        status: IssueStatus.InProgress,
        priority: IssuePriority.High,
        assigneeName: 'Carol White',
        projectName: 'Atlas Platform',
        dueDate: new Date('2026-04-08'),
        storyPoints: 21,
      },
      {
        title: 'Update OpenAPI documentation for v2 endpoints',
        description:
          'Regenerate Swagger docs for all v2 API endpoints. Ensure all request/response schemas are accurate and include examples.',
        status: IssueStatus.ToDo,
        priority: IssuePriority.Low,
        assigneeName: 'Dave Brown',
        projectName: 'Atlas Platform',
        dueDate: new Date('2026-05-01'),
        storyPoints: 3,
      },
      {
        title: 'Performance optimization for global search feature',
        description:
          'Search queries are taking over 3 seconds for large datasets. Investigate index usage and consider Elasticsearch integration.',
        status: IssueStatus.ToDo,
        priority: IssuePriority.Medium,
        assigneeName: 'Alice Johnson',
        projectName: 'Atlas Platform',
        dueDate: new Date('2026-05-15'),
        storyPoints: 13,
      },
      {
        title: 'Security audit and penetration testing',
        description:
          'Conduct full security audit of the platform before public launch. Focus on SQL injection, XSS, CSRF, and auth vulnerabilities.',
        status: IssueStatus.ToDo,
        priority: IssuePriority.High,
        assigneeName: 'Bob Smith',
        projectName: 'Atlas Platform',
        dueDate: new Date('2026-05-30'),
        storyPoints: 8,
      },
      {
        title: 'Implement email notification system',
        description:
          'Send transactional emails for issue assignments, status changes, and due date reminders using SendGrid or AWS SES.',
        status: IssueStatus.InProgress,
        priority: IssuePriority.Medium,
        assigneeName: 'Carol White',
        projectName: 'Phoenix Platform',
        dueDate: new Date('2026-04-25'),
        storyPoints: 8,
      },
      {
        title: 'Deploy application to staging environment',
        description:
          'Set up staging deployment on AWS ECS with RDS database. Configure environment variables and health checks.',
        status: IssueStatus.Done,
        priority: IssuePriority.High,
        assigneeName: 'Dave Brown',
        projectName: 'Atlas Platform',
        dueDate: new Date('2026-03-28'),
        storyPoints: 5,
      },
    ];

    for (const issueData of issues) {
      await this.issueRepository.create(issueData);
    }
  }
}
