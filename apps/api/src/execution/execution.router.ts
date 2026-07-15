import {
  createPaginationResponseSchema,
  ExecutionSchema,
  PAGINATION_SCHEMA,
  type PaginationDto,
} from '@repo/contracts';
import { Ctx, Input, Query, Router } from 'nestjs-trpc';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ExecutionService } from './providers/execution.service';

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
  public getExecutions(
    @Input() paginationDto: PaginationDto,
    @Ctx() session: UserSession,
  ) {
    return this.executionService.getExecution(paginationDto, session);
  }
}
