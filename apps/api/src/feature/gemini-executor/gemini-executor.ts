import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { BaseNodeExecutor } from '../base-executor/base.executor';
import { StatusPubSubService } from '../pub-sub/Status-Pub-Sub.service';
import { NodeModel } from '@repo/database';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import { GeminiContextDto } from './gemini-context.dto';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiNodeExecutor extends BaseNodeExecutor {
  constructor(
    /**
     * injecting pubsub
     */
    private readonly statusPubSubService: StatusPubSubService,
  ) {
    super(GeminiNodeExecutor.name);
  }

  public async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any> {
    try {
      await this.statusPubSubService.publishLoading(node.id, context.userId);
      const data = context.currentNodeInput as unknown as GeminiContextDto;
      const ai = new GoogleGenAI({
        apiKey: data.apiKey!,
      });

      const response = await ai.models.generateContent({
        model: data.model,
        contents: data.prompt, 
        config: {
          temperature: data.temperature,
        },
      });

      await this.statusPubSubService.publishSuccess(node.id, context.userId);
      return {
        status: 200,
        statusText: 'ok',
        response: response.text,
      };
    } catch (error) {
      console.log(error);
      this.statusPubSubService.publishError(node.id, context.userId);
      throw new RequestTimeoutException();
    }
  }
}
