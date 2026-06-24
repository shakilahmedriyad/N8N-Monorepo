import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { SaveWorkflowNodesDto } from '@repo/contracts';
import {
  ConnectionCreateManyInput,
  NodeCreateManyInput,
  NodeType,
} from '@repo/database';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from 'src/database/providers/database/database.service';
import random from 'random-string-generator';

@Injectable()
export class SaveWorkflowNodesProvider {
  constructor(
    /* Injecting Prisma Database
     */
    private readonly databaseService: DatabaseService,
  ) {}
  public saveWorkflowNodes(
    saveWorkflowNodesDto: SaveWorkflowNodesDto,
    session: UserSession,
  ) {
    try {
      const nodes: NodeCreateManyInput[] = saveWorkflowNodesDto.nodes.map(
        (node) => ({
          id: node.id,
          name: random(),
          position: node.position,
          workflowId: saveWorkflowNodesDto.workflowId,
          type: node.type as NodeType,
          data: node.data as {},
        }),
      );

      const connections: ConnectionCreateManyInput[] =
        saveWorkflowNodesDto.connections.map((connection) => ({
          name: random(),
          sourceId: connection.source,
          targetId: connection.target,
          workflowId: saveWorkflowNodesDto.workflowId,
        }));

      /// using transaction
      const updatedWorkflow = this.databaseService.$transaction(async (tx) => {
        const workflow = await tx.workflow.update({
          where: {
            userId: session.user.id,
            id: saveWorkflowNodesDto.workflowId,
          },
          data: {
            updatedAt: new Date(),
          },
        });
        await tx.node.deleteMany({
          where: { workflowId: saveWorkflowNodesDto.workflowId },
        });
        await tx.node.createMany({ data: nodes });
        await tx.connection.createMany({ data: connections });
        return workflow;
      });

      return updatedWorkflow;
    } catch (error) {
      throw new RequestTimeoutException(
        `Could not complete the request due to ${error}`,
      );
    }
  }
}
