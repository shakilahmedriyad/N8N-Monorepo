import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorkflowRouter } from './workflow.router';
import { WorkflowService } from './providers/workflow.service';
import { CreateWorkflowProvider } from './providers/create-workflow.provider';
import { GetWorkflowProvider } from './providers/get-workflow.provider';
import { GetWorkflowByIdProvider } from './providers/get-workflow-by-id.provider';
import { SaveWorkflowNodesProvider } from './providers/save-workflow-nodes.provider';
import { WorkflowExecutionProvider } from './providers/workflow-execution.provider';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowProcessor } from 'src/common/queue/workflow.processor';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'workflow',
    }),
    BullBoardModule.forFeature({
      adapter: BullMQAdapter,
      name: 'workflow',
    }),
  ],
  providers: [
    WorkflowRouter,
    WorkflowService,
    CreateWorkflowProvider,
    GetWorkflowProvider,
    GetWorkflowByIdProvider,
    SaveWorkflowNodesProvider,
    WorkflowExecutionProvider,
    WorkflowProcessor,
  ],
})
export class WorkflowModule {}
