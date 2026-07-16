import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      /// publishing loading
      await this.statusPubSubService.publishLoading(node.id, context.userId);

      const data = node.data as unknown as DiscordNodeData;
      const url = this.resolveInput(data.webhookUrl, context);
      if (!url) {
        throw new BadRequestException('webhook URL not found');
      }
      const response = await axios.post(url, {
        username: 'Workflow Engine',
        avatar_url:
          'https://unsplash.com/photos/man-in-black-button-up-shirt-ZHvM3XIOHoE',
        content: 'Node executed successfully.',
        embeds: [
          {
            title: 'Execution Complete',
            description: `\`\`\`json
${JSON.stringify(context.previousNodeOutputs, null, 2)}
\`\`\``,
            color: 65280,
          },
        ],
      });

      /**
       * publishing success of process
       */
      await this.statusPubSubService.publishSuccess(node.id, context.userId);

      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      };
    } catch (error) {
      /**
       * publishing error of process
       */
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw error;
    }
  }
}
