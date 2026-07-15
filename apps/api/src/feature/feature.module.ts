import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis/redis.service';
import { StatusPubSubService } from './pub-sub/Status-Pub-Sub.service';
import { HttpNodeExecutor } from './http-executor/http.executor';
import { ManualNodeExecutor } from './manual-executor/manual.executor';
import { ExecutorService } from './provider/executor/executor.service';
import { GoogleFormNodeExecutor } from './google-form-executor/google-form-executor';
import { DiscordNodeExecutor } from './discord-executor/discord-executor';
import { GeminiNodeExecutor } from './gemini-executor/gemini-executor';

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
    ExecutorService,
    DiscordNodeExecutor,
    GeminiNodeExecutor,
  ],
  exports: [
    RedisPubSubService,
    StatusPubSubService,
    HttpNodeExecutor,
    ManualNodeExecutor,
    ExecutorService,
  ],
})
export class FeatureModule {}
