import { NodeModel } from '@repo/database';
import { BaseNodeExecutor } from '../base-executor/base.executor';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import { Injectable } from '@nestjs/common';
import { StatusPubSubService } from '../pub-sub/Status-Pub-Sub.service';

@Injectable()
export class GoogleFormNodeExecutor extends BaseNodeExecutor {
  constructor(
    /**
     * injecting StatusPubSubService to ensure it's available for use in the executor
     */
    private readonly statusPubSubService: StatusPubSubService,
  ) {
    super(GoogleFormNodeExecutor.name);
  }

  protected async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<void> {
    // No specific execution logic for manual nodes
    await this.statusPubSubService.publish(
      {
        nodeId: node.id,
        status: 'loading',
        createdAt: new Date(),
        workflowId: node.workflowId,
      },
      context.userId,
    );

    /**
     * simulating some processing time for the manual node execution
     * this is just for demonstration purposes and can be adjusted as needed
     */
    await this.sleep(5000);

    await this.statusPubSubService.publish(
      {
        nodeId: node.id,
        status: 'success',
        createdAt: new Date(),
        workflowId: node.workflowId,
      },
      context.userId,
    );

    return context.currentNodeInput;
  }
}
