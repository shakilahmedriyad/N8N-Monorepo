import { Processor, WorkerHost } from '@nestjs/bullmq';
import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { ConnectionModel, NodeModel } from '@repo/database';
import { Job } from 'bullmq';
import { DatabaseService } from 'src/database/providers/database/database.service';
import { ExecutionService } from 'src/execution/providers/execution.service';
import { ExecutorService } from 'src/feature/provider/executor/executor.service';
import toposort from 'toposort';

@Processor('workflow')
export class WorkflowProcessor extends WorkerHost {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly executorService: ExecutorService,
    private readonly executionService: ExecutionService,
  ) {
    super();
  }

  private isEmptyObject(obj: Object) {
    return (
      !!obj &&
      typeof obj === 'object' &&
      Object.keys(obj).length === 0 &&
      obj.constructor === Object
    );
  }

  async process(job: Job): Promise<any> {
    try {
      /**
       * updating the database of execution
       */
      await this.executionService.startedExecution(job.data.executionId);

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
        const nodeData = node.data as any;
        response = await this.executorService.executeNode(node, {
          userId: job.data.userId,
          previousNodeOutputs: response,
          workflowId: job.data.workflowId,
          currentNodeInput: this.isEmptyObject(nodeData)
            ? job.data.context || {}
            : nodeData,
          variable: this.isEmptyObject(nodeData)
            ? job.data.context?.variable
            : (nodeData?.variable as string),
        });
      }

      await this.executionService.successExecution(
        job.data.executionId,
        response,
      );

      return response;
    } catch (error) {
      console.log('processor:', error);
      await this.executionService.errorExecution(
        job.data.executionId,
        error as unknown as object,
      );
    }
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
      throw new BadGatewayException('Workflow contains circular dependency');
    }
  }
}
