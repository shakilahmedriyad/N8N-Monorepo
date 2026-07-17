import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseNodeExecutor } from '../base-executor/base.executor';
import { NodeModel } from '@repo/database';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import axios from 'axios';
import { StatusPubSubService } from '../pub-sub/Status-Pub-Sub.service';

interface DiscordNodeData {
  webhookUrl: string;
  username?: string;
  avatarUrl?: string;
  title?: string;
  description?: string;
  color?: string;
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
      const description = this.resolveInput(data.description, context);
      if (!description) {
        throw new BadRequestException('No description is selected');
      }
      if (!url) {
        throw new BadRequestException('webhook URL not found');
      }
      const response = await axios.post(url, {
        username: data.username || 'Workflow Engine',
        avatar_url:
          data.avatarUrl ||
          'https://unsplash.com/photos/man-in-black-button-up-shirt-ZHvM3XIOHoE',
        content: data.title || 'Workflow executed successfully.',
        embeds: [
          {
            title: 'Execution Complete',
            description: `\`\`\`json
${JSON.stringify(description, null, 2)}
\`\`\``,
            color: 65280,
          },
        ],
      });
      console.log(response.data);
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
