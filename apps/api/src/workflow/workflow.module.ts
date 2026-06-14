import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorkflowRouter } from './workflow.router';
import { WorkflowService } from './providers/workflow.service';

@Module({
  imports: [DatabaseModule],
  providers: [WorkflowRouter, WorkflowService],
})
export class WorkflowModule {}
