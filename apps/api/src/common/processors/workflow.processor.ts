import { Processor, WorkerHost } from '@nestjs/bullmq';
import { BadRequestException } from '@nestjs/common';
import { ConnectionModel, NodeModel } from '@repo/database';
import { Job } from 'bullmq';
import { DatabaseService } from 'src/database/providers/database/database.service';
import { HttpNodeExecutor } from 'src/feature/http-executor/http-executor';
import toposort from 'toposort';

@Processor('workflow')
export class WorkflowProcessor extends WorkerHost {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly httpNodeExecutor: HttpNodeExecutor,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    const workflow = await this.databaseService.workflow.findUniqueOrThrow({
      where: {
        id: job.data.workflowId,
        userId: job.data.userId,
      },
      include: {
        nodes: true,
        connections: true,
      },
    });

    const executionNodes = this.getExecutionOrder(
      workflow.nodes,
      workflow.connections,
    );

    let response: any;

    for (const node of executionNodes) {
      if (node.type == 'HTTP_TRIGGER') {
        const nodeData = node.data as any;
        response = await this.httpNodeExecutor.execute(node, {
          previousNodeOutputs: response,
          workflowId: job.data.workflowId,
          currentNodeInput: nodeData || {},
          variable: nodeData?.variable as string,
        });
      }
    }
    console.log(response);

    return 'something ....';
  }

  private getExecutionOrder(
    nodes: NodeModel[],
    edges: ConnectionModel[],
  ): NodeModel[] {
    if (edges.length == 0) {
      throw new BadRequestException('no connection is present');
    }

    // Convert edges to format toposort expects
    const edgeArray: [string, string | undefined][] = edges.map((edge) => [
      edge.sourceId,
      edge.targetId,
    ]);

    const allNodeIds = nodes.map((node) => node.id);

    try {
      const sorted = toposort(edgeArray);

      const sortedNodeIds = sorted.filter((nodeId) =>
        allNodeIds.includes(nodeId),
      );

      const executionOrder = sortedNodeIds.map((nodeId) =>
        nodes.find((node) => node.id === nodeId),
      );

      return executionOrder as NodeModel[];
    } catch (error) {
      throw new Error('Workflow contains circular dependency');
    }
  }
}
