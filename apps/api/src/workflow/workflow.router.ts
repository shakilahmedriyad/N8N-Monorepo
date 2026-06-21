import { Ctx, Input, Mutation, Query, Router } from 'nestjs-trpc';
import {
  createPaginationResponseSchema,
  CreateWorkflowSchema,
  GetWorkflowByIdOutputSchema,
  GetWorkflowByIdSchema,
  PAGINATION_SCHEMA,
  UpdateWorkflowSchema,
  WorkflowSchema,
} from '@repo/contracts';

import {
  type CreateWorkflowDto,
  type GetWorkflowByIdDto,
  type PaginationDto,
  type UpdateWorkflowDto,
} from '@repo/contracts';
import * as z from 'zod';
import { WorkflowService } from './providers/workflow.service';
import { type UserSession } from '@thallesp/nestjs-better-auth';

/**
 * trpc router for workflows
 */
@Router({ alias: 'workflow' })
export class WorkflowRouter {
  constructor(
    /**
     * Injecting workflow Service
     */
    private readonly workflowService: WorkflowService,
  ) {}

  /**
   *
   * route for getting workflows
   */

  @Query({
    input: PAGINATION_SCHEMA,
    output: createPaginationResponseSchema(WorkflowSchema),
  })
  public async getWorkflows(
    @Input() paginationDto: PaginationDto,
    @Ctx() session: UserSession,
  ) {
    return await this.workflowService.getWorkflows(paginationDto, session);
  }

  /**
   *
   * route for getting workflow by id
   */

  @Query({
    input: GetWorkflowByIdSchema,
    output: GetWorkflowByIdOutputSchema,
  })
  public async getWorkflowById(
    @Input() getWorkflowByIdDto: GetWorkflowByIdDto,
    @Ctx() ctx: UserSession,
  ) {
    return await this.workflowService.getWorkflowById(
      getWorkflowByIdDto.workflowId,
      ctx,
    );
  }

  /**
   *
   * route for creating workflows
   */

  @Mutation({
    input: CreateWorkflowSchema,
    output: CreateWorkflowSchema,
  })
  public async createWorkflow(
    @Input() createWorkflowDto: CreateWorkflowDto,
    @Ctx() ctx: UserSession,
  ) {
    return await this.workflowService.createWorkflow(createWorkflowDto, ctx);
  }

  /**
   *
   * route for updating workflows
   */

  @Mutation({
    input: UpdateWorkflowSchema,
    output: WorkflowSchema,
  })
  public async updateWorkflow(
    @Input() updateWorkflowDto: UpdateWorkflowDto,
    @Ctx() ctx: UserSession,
  ) {
    return await this.workflowService.updateWorkflow(updateWorkflowDto, ctx);
  }

  /**
   *
   * route for removing workflow
   */

  @Query({
    input: z.object({
      id: z.string(),
    }),
    output: WorkflowSchema,
  })
  public async removeWorkflow(@Input() id: string, @Ctx() ctx: UserSession) {
    return await this.workflowService.removeWorkflow(id, ctx);
  }
}
