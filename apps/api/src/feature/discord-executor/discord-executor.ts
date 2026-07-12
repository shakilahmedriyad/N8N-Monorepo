import { Injectable } from '@nestjs/common';
import { BaseNodeExecutor } from '../base-executor/base.executor';
import { NodeModel } from '@repo/database';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import axios from 'axios';
import { StatusPubSubService } from '../pub-sub/Status-Pub-Sub.service';

interface DiscordNodeData {
  webhookUrl: string;
}

@Injectable()
export class DiscordNodeExecutor extends BaseNodeExecutor {
  constructor(
    /**
     * publsher for status
     */
    private readonly statusPubSubService: StatusPubSubService,
  ) {
    super(DiscordNodeExecutor.name);
  }
  protected async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any> {
    this.statusPubSubService.publish(
      {
        nodeId: node.id,
        status: 'loading',
        createdAt: new Date(),
        workflowId: node.workflowId,
      },
      context.userId,
    );

    const data = node.data as unknown as DiscordNodeData;
    const url = this.resolveInput(data.webhookUrl, context);
    const response = await axios.post(url, {
      username: 'Workflow Engine',
      avatar_url:
        'https://unsplash.com/photos/man-in-black-button-up-shirt-ZHvM3XIOHoE',
      content: 'Node executed successfully.',
      embeds: [
        {
          title: 'Execution Complete',
          description: 'The workflow finished.',
          color: 65280,
        },
      ],
    });

    this.statusPubSubService.publish(
      {
        nodeId: node.id,
        status: 'success',
        createdAt: new Date(),
        workflowId: node.workflowId,
      },
      context.userId,
    );

    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  }
}
