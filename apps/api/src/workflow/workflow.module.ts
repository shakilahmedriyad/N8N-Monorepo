import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorkflowRouter } from './workflow.router';
import { WorkflowService } from './providers/workflow.service';
import { CreateWorkflowProvider } from './providers/create-workflow.provider';
import { GetWorkflowProvider } from './providers/get-workflow.provider';
import { GetWorkflowByIdProvider } from './providers/get-workflow-by-id.provider';
import { SaveWorkflowNodesProvider } from './providers/save-workflow-nodes.provider';

@Module({
  imports: [DatabaseModule],
  providers: [WorkflowRouter, WorkflowService, CreateWorkflowProvider, GetWorkflowProvider, GetWorkflowByIdProvider, SaveWorkflowNodesProvider],
})
export class WorkflowModule {}
