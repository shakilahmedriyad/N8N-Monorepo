import { Module } from '@nestjs/common';
import { WorkflowRouter } from './workflow.router';
import { WorkflowService } from './providers/workflow.service';

@Module({
  imports: [],
  providers: [WorkflowRouter, WorkflowService],
})
export class WorkflowModule {}
