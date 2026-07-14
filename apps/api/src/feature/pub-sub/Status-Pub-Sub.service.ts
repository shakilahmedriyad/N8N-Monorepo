import { RedisPubSubService } from '../redis/redis.service';
import { Channels } from '../redis/redis-pubsub.constant';
import Redis from 'ioredis';

export class StatusPubSubService extends RedisPubSubService {
  public async publish(data: any, userId: string): Promise<void> {
    await this.publisher.publish(
      String(Channels.NODE_STATUS + ':' + userId),
      JSON.stringify(data),
    );
  }

  public async subscribe(userId: string): Promise<Redis> {
    await this.subscriber.subscribe(
      String(Channels.NODE_STATUS + ':' + userId),
    );
    return this.subscriber;
  }

  public async publishLoading(nodeId: string, userId: string) {
    this.publish(
      {
        nodeId: nodeId,
        status: 'loading',
        createdAt: new Date(),
      },
      userId,
    );
  }

  public async publishError(nodeId: string, userId: string) {
    this.publish(
      {
        nodeId: nodeId,
        status: 'error',
        createdAt: new Date(),
      },
      userId,
    );
  }

  public async publishSuccess(nodeId: string, userId: string) {
    this.publish(
      {
        nodeId: nodeId,
        status: 'success',
        createdAt: new Date(),
      },
      userId,
    );
  }
}
