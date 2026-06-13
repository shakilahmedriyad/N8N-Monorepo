import {
  Injectable,
  NotImplementedException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateWorkflowDto } from '@repo/trpc';

/**
 * Managing workflow business logic
 */

@Injectable()
export class WorkflowService {
  constructor /**
   * Injecting Workflow repository
   */() {}
  /**
   *creating new workflow
   */
  public async createWorkflow(createWorkflow: CreateWorkflowDto) {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }

  public async getWorkflows() {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }
}
