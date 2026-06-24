import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import type { Node, Edge, XYPosition } from '@xyflow/react';
import { DatabaseService } from 'src/database/providers/database/database.service';

@Injectable()
export class GetWorkflowByIdProvider {
  constructor(
    /**
     * Injecting Prisma Database
     */
    private readonly databaseService: DatabaseService,
  ) {}

  public async getWorkflowById(workflowId: string, session: UserSession) {
    try {
      const result = await this.databaseService.workflow.findFirstOrThrow({
        where: {
          id: workflowId,
          userId: session.user.id,
        },
        include: {
          connections: true,
          nodes: true,
        },
      });
      const {
        nodes: workflowNodes,
        connections: workflowConnection,
        ...workflow
      } = result;

      const nodes: Node[] = workflowNodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data as Record<string, unknown>,
        position: node.position as XYPosition,
      }));

      const connections: Edge[] = workflowConnection.map((connection) => ({
        id: connection.id,
        source: connection.sourceId,
        target: connection.targetId,
      }));

      return { workflow, nodes, connections };
    } catch (error) {
      throw new RequestTimeoutException(`Could not fetch workflow ${error}`);
    }
  }
}
