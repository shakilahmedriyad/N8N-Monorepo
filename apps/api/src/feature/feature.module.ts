import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis/redis.service';
import { HttpPubSubService } from './pub-sub/Http-Pub-Sub.service';

@Module({
  providers: [
    {
      provide: RedisPubSubService,
      useClass: RedisPubSubService as any,
    },
    HttpPubSubService,
  ],
  exports: [RedisPubSubService, HttpPubSubService],
})
export class FeatureModule {}
