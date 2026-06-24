import { Injectable, RequestTimeoutException } from '@nestjs/common';
import {
  CreateWorkflowDto,
  PaginationDto,
  UpdateWorkflowDto,
} from '@repo/contracts';
import type { Edge, Node, XYPosition } from '@xyflow/react';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';
import { CreateWorkflowProvider } from './create-workflow.provider';
import { GetWorkflowProvider } from './get-workflow.provider';
import { GetWorkflowByIdProvider } from './get-workflow-by-id.provider';

/**
 * Managing workflow business logic
 */

@Injectable()
export class WorkflowService {
  constructor(
    /**
     * Injecting Prisma Database
     */
    private readonly databaseService: DatabaseService,

    /**
     * Injecting Create Workflow provider
     */
    private readonly createWorkflowProvider: CreateWorkflowProvider,
    /**
     * Injecting get Workflow provider
     */
    private readonly getWorkflowProvider: GetWorkflowProvider,
    /**
     * Injecting get Workflow by id provider
     */
    private readonly getWorkflowByIdProvider: GetWorkflowByIdProvider,
  ) {}

  public createWorkflow(
    createWorkflowDto: CreateWorkflowDto,
    session: UserSession,
  ) {
    return this.createWorkflowProvider.createWorkflow(
      createWorkflowDto,
      session,
    );
  }

  public getWorkflows(paginationDto: PaginationDto, session: UserSession) {
    return this.getWorkflowProvider.getWorkflows(paginationDto, session);
  }

  public async getWorkflowById(workflowId: string, session: UserSession) {
    return this.getWorkflowByIdProvider.getWorkflowById(workflowId, session);
  }

  public async updateWorkflow(
    updateWorkflowDto: UpdateWorkflowDto,
    session: UserSession,
  ) {
    try {
      const workflow = await this.databaseService.workflow.update({
        where: {
          id: updateWorkflowDto.workflowId,
          userId: session.user.id,
        },
        data: {
          ...updateWorkflowDto.workflow,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException(`Could not fetch workflow ${error}`);
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
