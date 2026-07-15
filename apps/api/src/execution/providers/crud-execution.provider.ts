import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { DatabaseService } from 'src/database/providers/database/database.service';

@Injectable()
export class CRUDExecutionProvider {
  constructor(
    /**
     * injecting database
     */
    private readonly databaseService: DatabaseService,
  ) {}

  /**
   * creating execution using workflow id
   *
   * @param createExecutionDto
   * @returns
   */
  public async createExecuton(workflowId: string) {
    try {
      const execution = await this.databaseService.execution.create({
        data: {
          workflowId: workflowId,
          startedAt: new Date(),
        },
      });
      return execution;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * update execution status to running based on execution id
   * @param executionId
   * @returns
   */

  public async startedExecution(executionId: string) {
    try {
      const updatedExecution = await this.databaseService.execution.update({
        where: {
          id: executionId,
        },
        data: {
          status: 'RUNNING',
        },
      });
      return updatedExecution;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * updating execution to success and storing the data
   * @param executionId
   * @param nodeResults
   * @returns
   */

  public async successExecution(executionId: string, nodeResults: object) {
    try {
      const updatedExecution = await this.databaseService.execution.update({
        where: {
          id: executionId,
        },
        data: {
          status: 'SUCCESS',
          finishedAt: new Date(),
          nodeResults,
        },
      });
      return updatedExecution;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * updating execution status to failed and storing the error
   * @param executionId
   * @param error
   * @returns
   */
  public async errorExecution(executionId: string, error: object) {
    try {
      const updatedExecution = await this.databaseService.execution.update({
        where: {
          id: executionId,
        },
        data: {
          status: 'FAILED',
          finishedAt: new Date(),
          error: error,
        },
      });
      return updatedExecution;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
