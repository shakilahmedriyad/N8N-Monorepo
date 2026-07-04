import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis/redis.service';
import { HttpPubSubService } from './pub-sub/Http-Pub-Sub.service';
import { ManualPubSubService } from './pub-sub/manual-pub-sub.service';
import { HttpNodeExecutor } from './http-executor/http.executor';
import { ManualNodeExecutor } from './manual-executor/manual.executor';
import { ExecutionService } from './provider/execution.service.ts/execution.service';

@Module({
  imports: [],
  providers: [
    {
      provide: RedisPubSubService,
      useClass: RedisPubSubService as any,
    },
    HttpPubSubService,
    ManualPubSubService,
    HttpNodeExecutor,
    ManualNodeExecutor,
    ExecutionService,
  ],
  exports: [
    RedisPubSubService,
    HttpPubSubService,
    ManualPubSubService,
    HttpNodeExecutor,
    ManualNodeExecutor,
    ExecutionService,
  ],
})
export class FeatureModule {}
