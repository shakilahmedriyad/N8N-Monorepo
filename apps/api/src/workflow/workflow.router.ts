import { Ctx, Input, Mutation, Query, Router, Subscription } from 'nestjs-trpc';
import {
  createPaginationResponseSchema,
  CreateWorkflowSchema,
  GetWorkflowByIdOutputSchema,
  GetWorkflowByIdSchema,
  PAGINATION_SCHEMA,
  SaveWorkflowNodesSchema,
  UpdateWorkflowSchema,
  WorkflowSchema,
} from '@repo/contracts';

import type {
  CreateWorkflowDto,
  GetWorkflowByIdDto,
  PaginationDto,
  UpdateWorkflowDto,
  SaveWorkflowNodesDto,
} from '@repo/contracts';
import * as z from 'zod';
import { WorkflowService } from './providers/workflow.service';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import { HttpPubSubService } from 'src/feature/pub-sub/Http-Pub-Sub.service';

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
    /**
     * Injecting Http pub sub Service
     */
    private readonly httpPubSubService: HttpPubSubService,
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
    output: WorkflowSchema,
  })
  public async createWorkflow(
    @Input() createWorkflowDto: CreateWorkflowDto,
    @Ctx() ctx: UserSession,
  ) {
    return await this.workflowService.createWorkflow(createWorkflowDto, ctx);
  }

  /**
   *
   * route for saving workflow Nodes
   */

  @Mutation({
    input: SaveWorkflowNodesSchema,
    output: WorkflowSchema,
  })
  public saveWorkflowNodes(
    @Input() SaveWorkflowDto: SaveWorkflowNodesDto,
    @Ctx() ctx: UserSession,
  ) {
    return this.workflowService.saveWorkflowNodes(SaveWorkflowDto, ctx);
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

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: WorkflowSchema,
  })
  public async removeWorkflow(
    @Input() deleteWorkflowDto: { id: string },
    @Ctx() ctx: UserSession,
  ) {
    return await this.workflowService.removeWorkflow(deleteWorkflowDto, ctx);
  }

  /**
   * curds ends here , execution starts from here
   */

  @Mutation({
    input: z.object({
      workflowId: z.string(),
    }),
  })
  public execute(
    @Input() executionDto: { workflowId: string },
    @Ctx() ctx: UserSession,
  ) {
    return this.workflowService.execute(executionDto, ctx);
  }

  //// creating subscribe methods

  @Subscription()
  public async *nodeStatus() {
    const subscriber = await this.httpPubSubService.subscribe();
    const queue: any[] = [];

    let notify: (() => void) | null = null;

    subscriber.on('message', (_, message) => {
      queue.push(JSON.parse(message));
      if (notify) {
        notify();
        notify = null!;
      }
    });

    try {
      while (true) {
        if (queue.length === 0) {
          const pending = new Promise<void>((resolve) => {
            notify = resolve;
          });
          await pending;
        }

        while (queue.length > 0) {
          yield queue.shift();
        }
      }
    } catch (error) {
      console.error('Error in nodeStatus subscription:', error);
    }
  }
}
