import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Queue } from 'bullmq';
import { ExecuteWorkflowDto } from '../dtos/execute-workflow.dto';

@Injectable()
export class WorkflowExecutionProvider {
  constructor(
    @InjectQueue('workflow')
    private readonly workflowQueue: Queue,
  ) {}

  public async execute(executeDto: ExecuteWorkflowDto, session: UserSession) {
    this.workflowQueue.add(
      'execute-workflow',
      {
        workflowId: executeDto.workflowId,
        userId: session.user.id,
        context: executeDto.context,
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
