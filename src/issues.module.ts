import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './models/issue.entity';
import { IssueRepository } from './data-access/issue.repository';
import { IssueService } from './services/issue.service';
import { IssuesController } from './controllers/issues.controller';
import { SeedService } from './database/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Issue])],
  providers: [IssueRepository, IssueService, SeedService],
  controllers: [IssuesController],
})
export class IssuesModule {}
