import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Queue } from 'bullmq';
import { ExecuteWorkflowDto } from '../dtos/execute-workflow.dto';
import { ExecutionService } from 'src/execution/providers/execution.service';

@Injectable()
export class WorkflowExecutionProvider {
  constructor(
    @InjectQueue('workflow')
    private readonly workflowQueue: Queue,
    /**
     * injecting execution service
     */
    private readonly executionService: ExecutionService,
  ) {}

  public async execute(executeDto: ExecuteWorkflowDto, session: UserSession) {
    const execution = await this.executionService.createExecution(
      executeDto.workflowId,
    );

    this.workflowQueue.add(
      'execute-workflow',
      {
        workflowId: executeDto.workflowId,
        userId: session.user.id,
        context: executeDto.context,
        executionId: execution.id,
      },
      {
        attempts: 3, // Retry 3 times on failure
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

    return 'started the execution';
  }
}
