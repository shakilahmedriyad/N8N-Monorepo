// node-executors/http-node.executor.ts
import { BadRequestException, Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';
import { BaseNodeExecutor } from '../base-executor/base-executor';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import { NodeModel } from '@repo/database';
import { HttpPubSubService } from '../pub-sub/Http-Pub-Sub.service';

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
  constructor(private readonly httpPubSubService: HttpPubSubService) {
    super(HttpNodeExecutor.name);
  }

  protected async validate(node: NodeModel): Promise<void> {
    await super.validate(node);

    const data = node.data as unknown as HttpNodeData;

    if (!data.url) {
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'error',
        createdAt: new Date(),
        workflowId: node.workflowId,
      });
      throw new BadRequestException('Resolved URL is required');
    }

    if (!data.method) {
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'error',
        createdAt: new Date(),
        workflowId: node.workflowId,
      });
      throw new BadRequestException('HTTP method is required');
    }

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    if (!validMethods.includes(data.method)) {
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'error',
        createdAt: new Date(),
        workflowId: node.workflowId,
      });
      throw new BadRequestException(
        `Invalid HTTP method. Must be one of: ${validMethods.join(', ')}`,
      );
    }

    try {
      new URL(data.url);
    } catch (error) {
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'error',
        createdAt: new Date(),
        workflowId: node.workflowId,
      });
      throw new BadRequestException('Invalid URL format');
    }
  }

  protected async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any> {
    /// sending the loading event
    await this.httpPubSubService.publish({
      nodeId: node.id,
      status: 'loading',
      createdAt: new Date(),
      workflowId: context.workflowId,
    });

    await this.sleep(5000); // Simulate some processing time

    const data = node.data as unknown as HttpNodeData;

    const url = this.resolveInput(data.url, context);
    const body = this.resolveInput(data.body, context);
    const headers = this.resolveInput(data.headers, context);
    const queryParams = this.resolveInput(data.queryParams, context);
    if (!context.variable) {
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'error',
        createdAt: new Date(),
        workflowId: context.workflowId,
      });
      throw new BadRequestException('API variable is required');
    }

    this.logger.log(`Making ${data.method} request to: ${url}`);

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
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'success',
        createdAt: new Date(),
        workflowId: context.workflowId,
      });
      return {
        status: response.status,
        statusText: response.statusText,
        // headers: response.headers,
        data: response.data,
      };
    } catch (error) {
      await this.httpPubSubService.publish({
        nodeId: node.id,
        status: 'error',
        createdAt: new Date(),
        workflowId: context.workflowId,
      });
      if (axios.isAxiosError(error)) {
        if (error.response) {
          this.logger.error(
            `HTTP request failed with status: ${error.response.status}`,
          );
          throw new BadRequestException(
            `HTTP ${error.response.status}: ${error.response.statusText}`,
          );
        } else if (error.request) {
          this.logger.error('No response received from server');
          throw new Error('No response from server');
        }

        this.logger.error('Error setting up request:', error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }

      this.logger.error('Unexpected error during HTTP request', error);
      throw new Error('Unexpected error during HTTP request');
    }
  }
}
