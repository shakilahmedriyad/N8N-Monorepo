import {
  Injectable,
  NotImplementedException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateWorkflowDto } from '@repo/trpc';
import { DatabaseService } from 'src/database/providers/database/database.service';

/**
 * Managing workflow business logic
 */

@Injectable()
export class WorkflowService {
  constructor /**
   * Injecting Prisma Database
   */(private readonly databaseService: DatabaseService) {}
  /**
   *creating new workflow
   */
  public async createWorkflow(createWorkflow: CreateWorkflowDto) {
    try {
      const workflow = await this.databaseService.workflow.create({
        data: createWorkflow,
      });
      return workflow;
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
