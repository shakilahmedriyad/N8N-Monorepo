// node-executors/base-node.executor.ts
import { BadRequestException, Logger } from '@nestjs/common';
import {
  ExecutionContextDto,
  NodeExecutionResultDto,
} from './base-executor.dto';
import { NodeModel } from '@repo/database';

export abstract class BaseNodeExecutor {
  protected readonly logger: Logger;

  constructor(loggerContext: string) {
    this.logger = new Logger(loggerContext);
  }

  /// this function needs to be implemented
  protected abstract executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any>;

  async execute(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<NodeExecutionResultDto> {
    try {
      if (!context.variable) {
        throw new BadRequestException('api variable is not found');
      }

      this.logger.log(`Executing node: ${node.name} (${node.type})`);

      await this.validate(node);
      const output = await this.executeNode(node, context);

      return {
        success: true,
        ...context.previousNodeOutputs,
        [context.variable]: output,
      };
    } catch (error) {
      this.logger.error(`Node ${node.name} failed:`, error);

      return {
        success: false,
        error: JSON.stringify(error),
      };
    }
  }

  protected async validate(node: any): Promise<void> {
    if (!node.id) {
      throw new BadRequestException('Node ID is required');
    }

    if (!node.type) {
      throw new BadRequestException('Node type is required');
    }
  }

  protected resolveInput(input: any, context: ExecutionContextDto): any {
    if (typeof input === 'string') {
      return input.replace(/\{\{(.+?)\}\}/g, (match, path) => {
        const value = this.getValueByPath(context.previousNodeOutputs, path);
        return value !== undefined ? value : match;
      });
    }

    if (typeof input === 'object' && input !== null) {
      const resolved = {};
      for (const [key, value] of Object.entries(input)) {
        resolved[key] = this.resolveInput(value, context);
      }
      return resolved;
    }

    return input;
  }

  private getValueByPath(obj: any, path: string): any {
    const parts = path.trim().split('.');
    let current = obj;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }

    return current;
  }
}
