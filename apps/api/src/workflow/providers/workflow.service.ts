import { Injectable, RequestTimeoutException } from '@nestjs/common';
import {
  CreateWorkflowDto,
  PaginationDto,
  UpdateWorkflowDto,
  SaveWorkflowNodesDto,
} from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';
import { CreateWorkflowProvider } from './create-workflow.provider';
import { GetWorkflowProvider } from './get-workflow.provider';
import { GetWorkflowByIdProvider } from './get-workflow-by-id.provider';
import { SaveWorkflowNodesProvider } from './save-workflow-nodes.provider';
import { WorkflowExecutionProvider } from './workflow-execution.provider';
import { ExecuteWorkflowDto } from '../dtos/execute-workflow.dto';

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
    /**
     * Injecting get Workflow by id provider
     */
    private readonly saveWorkflowNodesProvider: SaveWorkflowNodesProvider,
    /**
     * Injecting execute Workflow  provider
     *
     */
    private readonly workflowExecutionProvider: WorkflowExecutionProvider,
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

  public getWorkflowById(workflowId: string, session: UserSession) {
    return this.getWorkflowByIdProvider.getWorkflowById(workflowId, session);
  }

  /**
   *
   * @param saveWorkflowNodesDto
   * @param session
   * @returns
   *
   * save workflow nodes
   */

  public saveWorkflowNodes(
    saveWorkflowNodesDto: SaveWorkflowNodesDto,
    session: UserSession,
  ) {
    return this.saveWorkflowNodesProvider.saveWorkflowNodes(
      saveWorkflowNodesDto,
      session,
    );
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

  public async removeWorkflow(
    deleteWorkflowDto: { id: string },
    session: UserSession,
  ) {
    try {
      const workflow = this.databaseService.workflow.delete({
        where: {
          id: deleteWorkflowDto.id,
          userId: session.user.id,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  public async execute(executeDto: ExecuteWorkflowDto, session: UserSession) {
    return this.workflowExecutionProvider.execute(executeDto, session);
  }
}
