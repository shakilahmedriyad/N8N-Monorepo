import { Module } from '@nestjs/common';

import { TRPCModule } from 'nestjs-trpc';
import { WorkflowModule } from './workflow/workflow.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TRPCModule.forRoot({}), WorkflowModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
