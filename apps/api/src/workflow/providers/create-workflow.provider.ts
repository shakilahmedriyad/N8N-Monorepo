import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateWorkflowDto } from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';

@Injectable()
export class CreateWorkflowProvider {
  /* Injecting Prisma Database
   */
  constructor(private readonly databaseService: DatabaseService) {}

  public async createWorkflow(
    createWorkflowDto: CreateWorkflowDto,
    session: UserSession,
  ) {
    try {
      const workflow = await this.databaseService.workflow.create({
        data: {
          ...createWorkflowDto,
          userId: session.user.id,
          nodes: {
            create: {
              name: 'Initial',
              position: { x: 0, y: 0 },
            },
          },
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }
}
