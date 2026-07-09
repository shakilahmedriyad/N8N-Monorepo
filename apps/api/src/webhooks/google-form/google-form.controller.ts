import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/providers/database/database.service';
import { AllowAnonymous, UserSession } from '@thallesp/nestjs-better-auth';
import { WorkflowService } from 'src/workflow/providers/workflow.service';

@AllowAnonymous()
@Controller('api/webhooks/google-form')
export class GoogleFormController {
  constructor(
    private readonly workflowService: WorkflowService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('/:workflowId')
  async googleFormTrigger(
    @Body() body: any,
    @Param('workflowId') workflowId: string,
  ) {
    const result = await this.databaseService.user.findFirst({
      where: {
        workflow: {
          some: {
            id: workflowId,
          },
        },
      },
      include: {
        sessions: true,
      },
    });

    if (!result) {
      throw new UnauthorizedException();
    }

    const sessionEntity = result.sessions[0];
    if (!sessionEntity) {
      throw new UnauthorizedException();
    }

    const session: UserSession = {
      session: sessionEntity,
      user: result,
    };

    this.workflowService.execute({ workflowId, context: body }, session);
    return { message: 'started executing nodes shortly', workflowId };
  }
}
