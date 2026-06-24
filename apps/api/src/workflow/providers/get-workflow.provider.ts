import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PaginationDto } from '@repo/contracts';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';

@Injectable()
export class GetWorkflowProvider {
  /* Injecting Prisma Database
   */
  constructor(private readonly databaseService: DatabaseService) {}

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
      throw new RequestTimeoutException('Could not fetch workflows');
    }
  }
}
