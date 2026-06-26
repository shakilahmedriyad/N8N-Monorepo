import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Queue } from 'bullmq';

@Injectable()
export class WorkflowExecutionProvider {
  constructor(
    @InjectQueue('workflow')
    private readonly workflowQueue: Queue,
  ) {}

  public async execute(
    executeDto: { workflowId: string },
    session: UserSession,
  ) {
    this.workflowQueue.add(
      'execute-workflow',
      {
        workflowId: executeDto.workflowId,
        userId: session.user.id,
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
