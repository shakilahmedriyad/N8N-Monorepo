import { Injectable } from '@nestjs/common';
import { GetExecutionProvider } from './get-execution.provider';
import { PaginationDto } from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class ExecutionService {
  constructor(
    /**
     * injecting get execution provider
     */
    private readonly getExecutionProvider: GetExecutionProvider,
  ) {}

  public async getExecution(
    paginationDto: PaginationDto,
    session: UserSession,
  ) {
    return this.getExecutionProvider.getExecution(paginationDto, session);
  }
}
