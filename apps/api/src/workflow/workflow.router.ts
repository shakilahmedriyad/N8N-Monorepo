import { Ctx, Input, Mutation, Query, Router } from 'nestjs-trpc';
import {
  type CreateWorkflowDto,
  CreateWorkflowSchema,
  Workflow,
  WorkflowSchema,
} from '@repo/contracts';
import * as z from 'zod';
import { WorkflowService } from './providers/workflow.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

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
    output: z.array(WorkflowSchema),
  })
  public async getWorkflows(@Ctx() ctx: UserSession): Promise<Workflow[]> {
    return await this.workflowService.getWorkflows(ctx);
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
    @Session() session: UserSession,
  ) {
    return await this.workflowService.createWorkflow(
      createWorkflowDto,
      session,
    );
  }

  /**
   *
   * route for getting workflow by id
   */

  @Query({
    input: z.object({
      id: z.string(),
    }),
    output: CreateWorkflowSchema,
  })
  public async getWorkflowById(
    @Input() id: string,
    @Session() session: UserSession,
  ) {
    return await this.workflowService.getWorkflowById(id, session);
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
  public async removeWorkflow(@Input() id, session: UserSession) {
    return await this.workflowService.removeWorkflow(id, session);
  }
}
