import { Module } from '@nestjs/common';
import { GoogleFormController } from './google-form.controller';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [WorkflowModule, DatabaseModule],
  providers: [],
  controllers: [GoogleFormController],
})
export class GoogleFormModule {}
