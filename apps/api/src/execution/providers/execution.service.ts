import { Injectable } from '@nestjs/common';
import { GetExecutionProvider } from './get-execution.provider';
import { GetExecutionByIdDto, PaginationDto } from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { CRUDExecutionProvider } from './crud-execution.provider';

@Injectable()
export class ExecutionService {
  constructor(
    /**
     * injecting get execution provider
     */
    private readonly getExecutionProvider: GetExecutionProvider,
    /**
     * injecting the CRUD execution provider
     */
    private readonly crudExectionProvider: CRUDExecutionProvider,
  ) {}

  public async getExecution(
    paginationDto: PaginationDto,
    session: UserSession,
  ) {
    const res = await this.getExecutionProvider.getExecution(
      paginationDto,
      session,
    );
    return res;
  }

  public async getExecutionById(
    getExecutionByIdDto: GetExecutionByIdDto,
    session: UserSession,
  ) {
    return this.getExecutionProvider.getExecutionById(
      getExecutionByIdDto,
      session,
    );
  }

  /**
   * creating execution based on workflowId
   * @param workflowId
   * @returns
   */
  public async createExecution(workflowId: string) {
    return this.crudExectionProvider.createExecuton(workflowId);
  }

  /**
   * update execution status to running based on execution id
   * @param executionId
   * @returns
   */
  public async startedExecution(executionId: string) {
    return this.crudExectionProvider.startedExecution(executionId);
  }

  /**
   * updating execution to success and storing the data
   * @param executionId
   * @param nodeResults
   * @returns
   */

  public async successExecution(executionId: string, nodeResults: object) {
    return this.crudExectionProvider.successExecution(executionId, nodeResults);
  }

  /**
   * updating execution status to failed and storing the error
   * @param executionId
   * @param error
   * @returns
   */
  public async errorExecution(executionId: string, error: object) {
    return this.crudExectionProvider.errorExecution(executionId, error);
  }
}
