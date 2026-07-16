import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetExecutionByIdDto, PaginationDto } from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';

@Injectable()
export class GetExecutionProvider {
  constructor(
    /**
     * injecting database
     */
    private readonly databaseService: DatabaseService,
  ) {}

  public async getExecutionById(
    getExecutionByIdDto: GetExecutionByIdDto,
    session: UserSession,
  ) {
    try {
      const result = await this.databaseService.execution.findUniqueOrThrow({
        where: {
          id: getExecutionByIdDto.executionId,
          workflow: { userId: session.user.id },
        },
        include: {
          workflow: {
            select: {
              name: true,
            },
          },
        },
      });

      const { workflow, ...execution } = result;

      return { ...execution, workflowName: workflow.name };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  public async getExecution(
    paginationDto: PaginationDto,
    session: UserSession,
  ) {
    try {
      const currentPage = paginationDto.page;
      const totalCount = await this.databaseService.execution.count({
        where: { workflow: { userId: session.user.id } },
      });

      const executions = await this.databaseService.execution.findMany({
        where: {
          workflow: {
            userId: session.user.id,
          },
        },
        include: {
          workflow: {
            select: {
              name: true,
            },
          },
        },
        take: paginationDto.pageSize,
        skip: (paginationDto.page - 1) * paginationDto.pageSize,
      });

      const items = executions.map(({ workflow, ...execution }) => ({
        ...execution,
        workflowName: workflow.name,
      }));

      const totalPage = Math.ceil(totalCount / paginationDto.pageSize);
      const nextPage = totalPage > currentPage ? currentPage + 1 : currentPage;
      const prevPage = currentPage > 0 ? currentPage - 1 : currentPage;
      return {
        totalCount,
        totalPage,
        currentPage,
        nextPage,
        prevPage,
        items,
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
