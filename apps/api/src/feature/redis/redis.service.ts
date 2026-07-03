// redis/redis-pubsub.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class RedisPubSubService implements OnModuleDestroy {
  protected publisher: Redis;
  protected subscriber: Redis;
  constructor(private readonly configService: ConfigService) {
    this.publisher = new Redis({
      host: this.configService.get('REDIS_HOST') || 'localhost',
      port: this.configService.get('REDIS_PORT'),
    });

    this.subscriber = new Redis({
      host: this.configService.get('REDIS_HOST') || 'localhost',
      port: this.configService.get('REDIS_PORT'),
    });
  }

  onModuleDestroy() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }

  public abstract publish(data: any): void;
  public abstract subscribe(): Promise<Redis>;
}
