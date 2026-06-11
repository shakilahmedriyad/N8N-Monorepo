import { Module } from '@nestjs/common';
import { WorkflowRouter } from './workflow.router';

@Module({
  providers: [WorkflowRouter],
})
export class WorkflowModule {}
