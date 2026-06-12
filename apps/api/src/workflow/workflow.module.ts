import { Module } from '@nestjs/common';
import { WorkflowRouter } from './workflow.router';
import { WorkflowService } from './providers/workflow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './workflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow])],
  providers: [WorkflowRouter, WorkflowService],
})
export class WorkflowModule {}
