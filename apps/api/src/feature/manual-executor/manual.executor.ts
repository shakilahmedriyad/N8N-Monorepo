import { NodeModel } from '@repo/database';
import { BaseNodeExecutor } from '../base-executor/base.executor';
import { ManualPubSubService } from '../pub-sub/manual-pub-sub.service';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManualNodeExecutor extends BaseNodeExecutor {
  constructor(
    /**
     * injecting ManualPubSubService to ensure it's available for use in the executor
     */
    private readonly manualPubSubService: ManualPubSubService,
  ) {
    super(ManualNodeExecutor.name);
  }

  protected async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<void> {
    // No specific execution logic for manual nodes
    this.manualPubSubService.publish({
      nodeId: node.id,
      status: 'loading',
      createdAt: new Date(),
      workflowId: node.workflowId,
    });

    /**
     * simulating some processing time for the manual node execution
     * this is just for demonstration purposes and can be adjusted as needed
     */
    await this.sleep(5000);

    this.manualPubSubService.publish({
      nodeId: node.id,
      status: 'success',
      createdAt: new Date(),
      workflowId: node.workflowId,
    });

    return context.currentNodeInput;
  }
}
