import { Injectable } from '@nestjs/common';
import { NodeModel } from '@repo/database';
import { ExecutionContextDto } from 'src/feature/base-executor/base-executor.dto';
import { GoogleFormNodeExecutor } from 'src/feature/google-form-executor/google-form-executor';
import { HttpNodeExecutor } from 'src/feature/http-executor/http.executor';
import { ManualNodeExecutor } from 'src/feature/manual-executor/manual.executor';

@Injectable()
export class ExecutionService {
  constructor(
    /**
     * injecting HttpNodeExecutor to ensure it's available for use in the service
     */
    private readonly httpNodeExecutor: HttpNodeExecutor,
    /**
     * injecting HttpNodeExecutor to ensure it's available for use in the service
     */
    private readonly manualNodeExecutor: ManualNodeExecutor,
    /**
     * injecting HttpNodeExecutor to ensure it's available for use in the service
     */
    private readonly googleFormNodeExecutor: GoogleFormNodeExecutor,
  ) {}

  public async executeNode(
    node: NodeModel,
    context: ExecutionContextDto,
  ): Promise<any> {
    switch (node.type) {
      case 'HTTP_TRIGGER':
        return this.httpNodeExecutor.execute(node, context);
      case 'MANUAL_TRIGGER':
        return this.manualNodeExecutor.execute(node, context);
      case 'GOOGLE_FORM_TRIGGER':
        return this.googleFormNodeExecutor.execute(node, context);
      default:
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  }
}
