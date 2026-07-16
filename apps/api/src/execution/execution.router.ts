import {
  createPaginationResponseSchema,
  ExecutionSchema,
  GetExecutionByIdSchema,
  PAGINATION_SCHEMA,
  type PaginationDto,
  type GetExecutionByIdDto,
} from '@repo/contracts';
import { Ctx, Input, Query, Router } from 'nestjs-trpc';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ExecutionService } from './providers/execution.service';
import z from 'zod';

/**
 * trpc router for execution
 */
@Router({ alias: 'execution' })
export class ExecutionRouter {
  constructor(
    /**
     * injecting execution service
     */
    private readonly executionService: ExecutionService,
  ) {}

  @Query({
    input: PAGINATION_SCHEMA,
    output: createPaginationResponseSchema(ExecutionSchema),
  })
  public async getExecutions(
    @Input() paginationDto: PaginationDto,
    @Ctx() session: UserSession,
  ) {
    return await this.executionService.getExecution(paginationDto, session);
  }

  @Query({
    input: GetExecutionByIdSchema,
    output: ExecutionSchema,
  })
  public async getExecutionById(
    @Input() getExecutionByIdDto: GetExecutionByIdDto,
    @Ctx() ctx: UserSession,
  ) {
    return this.executionService.getExecutionById(getExecutionByIdDto, ctx);
  }
}
