// node-executors/http-node.executor.ts
import { Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';
import { BaseNodeExecutor } from '../base-executor/base-executor';
import { ExecutionContextDto } from '../base-executor/base-executor.dto';
import { NodeModel } from '@repo/database';

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
  constructor() {
    super(HttpNodeExecutor.name);
  }

  protected async validate(node: NodeModel): Promise<void> {
    await super.validate(node);

    const data = node.data as unknown as HttpNodeData;

    if (!data.url) {
      throw new Error('HTTP URL is required');
    }

    if (!data.method) {
      throw new Error('HTTP method is required');
    }

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    if (!validMethods.includes(data.method)) {
      throw new Error(
        `Invalid HTTP method. Must be one of: ${validMethods.join(', ')}`,
      );
    }

    try {
      new URL(data.url);
    } catch (error) {
      throw new Error('Invalid URL format');
    }
  }

  protected async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any> {
    const data = node.data as unknown as HttpNodeData;

    const url = this.resolveInput(data.url, context);
    const body = this.resolveInput(data.body, context);
    const headers = this.resolveInput(data.headers, context);
    const queryParams = this.resolveInput(data.queryParams, context);

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
      return {
        status: response.status,
        statusText: response.statusText,
        // headers: response.headers,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          this.logger.error(
            `HTTP request failed with status: ${error.response.status}`,
          );
          throw new Error(
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
