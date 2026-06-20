import { Injectable, RequestTimeoutException } from '@nestjs/common';
import {
  CreateWorkflowDto,
  PaginationDto,
  UpdateWorkflowDto,
} from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';

/**
 * Managing workflow business logic
 */

@Injectable()
export class WorkflowService {
  constructor /**
   * Injecting Prisma Database
   */(private readonly databaseService: DatabaseService) {}
  /**
   *creating new workflow
   */
  public async createWorkflow(
    createWorkflow: CreateWorkflowDto,
    session: UserSession,
  ) {
    try {
      const workflow = await this.databaseService.workflow.create({
        data: { ...createWorkflow, userId: session.user.id },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }

  public async getWorkflows(
    paginationDto: PaginationDto,
    session: UserSession,
  ) {
    try {
      const currentPage = paginationDto.page;

      const totalCount = await this.databaseService.workflow.count({
        where: {
          userId: session.user.id,
          name: {
            contains: paginationDto.search,
            mode: 'insensitive',
          },
        },
      });

      const items = await this.databaseService.workflow.findMany({
        where: {
          userId: session.user.id,
          name: {
            contains: paginationDto.search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        skip: (currentPage - 1) * paginationDto.pageSize,
        take: paginationDto.pageSize,
      });
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
      console.log(error);
      throw new RequestTimeoutException('Could not fetch workflows');
    }
  }

  public async getWorkflowById(workflowId: string, session: UserSession) {
    try {
      const workflow = await this.databaseService.workflow.findFirstOrThrow({
        where: {
          id: workflowId,
          userId: session.user.id,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException(`Could not fetch workflow ${error}`);
    }
  }

  public async updateWorkflow(
    updateWorkflowDto: UpdateWorkflowDto,
    session: UserSession,
  ) {
    try {
      const workflow = await this.databaseService.workflow.update({
        where: {
          id: updateWorkflowDto.workflowId,
          userId: session.user.id,
        },
        data: {
          ...updateWorkflowDto.workflow,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException(`Could not fetch workflow ${error}`);
    }
  }

  public async removeWorkflow(id: string, session: UserSession) {
    try {
      const workflow = this.databaseService.workflow.delete({
        where: {
          id,
          userId: session.user.id,
        },
      });
      return workflow;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
