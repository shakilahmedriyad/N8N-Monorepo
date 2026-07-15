import { Module } from '@nestjs/common';
import { ExecutionService } from './providers/execution.service';
import { GetExecutionProvider } from './providers/get-execution.provider';
import { ExecutionRouter } from './execution.router';
import { DatabaseModule } from 'src/database/database.module';
import { CRUDExecutionProvider } from './providers/crud-execution.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ExecutionService,
    GetExecutionProvider,
    ExecutionRouter,
    CRUDExecutionProvider,
  ],
  exports: [ExecutionService],
})
export class ExecutionModule {}
