import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { type CreateWorkflowDto, CreateWorkflowSchema } from '@repo/trpc';
import * as z from 'zod';

/**
 * trpc router for workflows
 */
@Router({ alias: 'workflow' })
export class WorkflowRouter {
  constructor() {}

  /**
   *
   * route for getting workflows
   */

  @Query({
    output: z.array(CreateWorkflowSchema),
  })
  public getWorkflows() {
    return [];
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
    console.log(createWorkflowDto);
    return 'ok we are doing !!!!';
  }
}
