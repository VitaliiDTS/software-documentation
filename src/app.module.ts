import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './models/issue.entity';
import { IssuesModule } from './issues.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'jira.db',
      entities: [Issue],
      synchronize: true,
    }),
    IssuesModule,
  ],
})
export class AppModule {}
