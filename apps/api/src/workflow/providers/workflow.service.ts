import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Workflow } from '../workflow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWorkflowDto } from '@repo/trpc';

/**
 * Managing workflow business logic
 */

@Injectable()
export class WorkflowService {
  constructor(
    /**
     * Injecting Workflow repository
     */
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}
  /**
   *creating new workflow
   */
  public async createWorkflow(createWorkflow: CreateWorkflowDto) {
    try {
      const workflow = this.workflowRepository.create(createWorkflow);
      return await this.workflowRepository.save(workflow);
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }

  public async getWorkflows() {
    try {
      const workflows = await this.workflowRepository.find();
      return workflows;
    } catch (error) {
      throw new RequestTimeoutException('Could not create workflow');
    }
  }
}
