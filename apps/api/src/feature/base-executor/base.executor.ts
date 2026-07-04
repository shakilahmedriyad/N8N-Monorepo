// node-executors/base-node.executor.ts
import { BadRequestException, Logger } from '@nestjs/common';
import {
  ExecutionContextDto,
  NodeExecutionResultDto,
} from './base-executor.dto';
import Handlebars from 'handlebars';
import { NodeModel } from '@repo/database';

export abstract class BaseNodeExecutor {
  protected readonly logger: Logger;

  constructor(loggerContext: string) {
    this.logger = new Logger(loggerContext);
    Handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context, null, 2);
    });
  }

  /// this function needs to be implemented
  protected abstract executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any>;

  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async execute(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<NodeExecutionResultDto> {
    try {
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
      try {
        const template = Handlebars.compile(input);
        const result = template(context.previousNodeOutputs);
        // Try to parse as JSON if it looks like JSON
        if (result.startsWith('{') || result.startsWith('[')) {
          try {
            return JSON.parse(result);
          } catch {
            return result;
          }
        }

        return result;
      } catch (error: any) {
        this.logger.warn(`Failed to resolve template: ${input}`, error.message);
        return input;
      }
    }

    if (Array.isArray(input)) {
      return input.map((item) => this.resolveInput(item, context));
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
}
