import {
  Injectable,
  NotImplementedException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateWorkflowDto } from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
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
  public async createWorkflow(
    createWorkflow: CreateWorkflowDto,
    session: UserSession,
  ) {
    try {
      const workflow = await this.databaseService.workflow.create({
        data: { ...createWorkflow, userId: session.user.id },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }

  public async getWorkflows(session: UserSession) {
    try {
      const workflows = await this.databaseService.workflow.findMany({
        where: {
          userId: session.user.id,
        },
      });
      console.log(workflows);
      return workflows;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Could not fetch workflows');
    }
  }

  public async getWorkflowById(id: string, session: UserSession) {
    try {
      const workflow = await this.databaseService.workflow.findMany({
        where: {
          id,
          userId: session.user.id,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }

  public async removeWorkflow(id: string, session: UserSession) {
    try {
      const workflow = this.databaseService.workflow.delete({
        where: {
          id,
          userId: session.user.id,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
