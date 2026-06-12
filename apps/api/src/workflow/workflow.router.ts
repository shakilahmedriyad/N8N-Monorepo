import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import {
  type CreateWorkflowDto,
  CreateWorkflowSchema,
  WorkflowSchema,
} from '@repo/trpc';
import * as z from 'zod';
import { WorkflowService } from './providers/workflow.service';
import { Workflow } from './workflow.entity';

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
  public getWorkflows() {
    return this.workflowService.getWorkflows();
  }

  /**
   *
   * route for creating workflows
   */

  @Mutation({
    input: CreateWorkflowSchema,
    output: CreateWorkflowSchema,
  })
  createWorkflow(@Input() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.createWorkflow(createWorkflowDto);
  }
}
