// node-executors/http-node.executor.ts
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';
import { BaseNodeExecutor } from '../base-executor/base.executor';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import { NodeModel } from '@repo/database';
import { StatusPubSubService } from '../pub-sub/Status-Pub-Sub.service';

interface HttpNodeData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string>;
  timeout?: number;
}

@Injectable()
export class HttpNodeExecutor extends BaseNodeExecutor {
  constructor(private readonly statusPubSubService: StatusPubSubService) {
    super(HttpNodeExecutor.name);
  }

  protected async validate(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<void> {
    await super.validate(node, context);

    const data = node.data as unknown as HttpNodeData;

    if (!data.url) {
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw new BadRequestException('Resolved URL is required');
    }

    if (!data.method) {
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw new BadRequestException('HTTP method is required');
    }

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    if (!validMethods.includes(data.method)) {
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw new BadRequestException(
        `Invalid HTTP method. Must be one of: ${validMethods.join(', ')}`,
      );
    }

    try {
      new URL(data.url);
    } catch (error) {
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw new BadRequestException('Invalid URL format');
    }
  }

  protected async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any> {
    /// sending the loading event
    await this.statusPubSubService.publishLoading(node.id, context.userId);

    await this.sleep(5000); // Simulate some processing time

    const data = node.data as unknown as HttpNodeData;

    const url = this.resolveInput(data.url, context);
    const body = this.resolveInput(data.body, context);
    const headers = this.resolveInput(data.headers, context);
    const queryParams = this.resolveInput(data.queryParams, context);
    if (!context.variable) {
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw new BadRequestException('API variable is required');
    }

    const config: AxiosRequestConfig = {
      method: data.method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: data.timeout || 30000,
    };

    if (queryParams && Object.keys(queryParams).length > 0) {
      config.params = queryParams;
    }

    if (['POST', 'PUT', 'PATCH'].includes(data.method) && body) {
      config.data = typeof body === 'string' ? JSON.parse(body) : body;
    }

    try {
      const response = await axios(config);
      // later we will add status update over here
      await this.statusPubSubService.publishSuccess(node.id, context.userId);
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      };
    } catch (error) {
      await this.statusPubSubService.publishError(node.id, context.userId);
      throw error;
    }
  }
}
