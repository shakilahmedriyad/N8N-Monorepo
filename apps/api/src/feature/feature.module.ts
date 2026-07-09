import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis/redis.service';
import { StatusPubSubService } from './pub-sub/Status-Pub-Sub.service';
import { HttpNodeExecutor } from './http-executor/http.executor';
import { ManualNodeExecutor } from './manual-executor/manual.executor';
import { ExecutionService } from './provider/execution.service.ts/execution.service';
import { GoogleFormNodeExecutor } from './google-form-executor/google-form-executor';

@Module({
  imports: [],
  providers: [
    {
      provide: RedisPubSubService,
      useClass: RedisPubSubService as any,
    },
    StatusPubSubService,

    HttpNodeExecutor,
    ManualNodeExecutor,
    GoogleFormNodeExecutor,
    ExecutionService,
  ],
  exports: [
    RedisPubSubService,
    StatusPubSubService,
    HttpNodeExecutor,
    ManualNodeExecutor,
    ExecutionService,
  ],
})
export class FeatureModule {}
