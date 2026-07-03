import { RedisPubSubService } from '../redis/redis.service';
import { Channels } from '../redis/redis-pubsub.constant';
import Redis from 'ioredis';

export class HttpPubSubService extends RedisPubSubService {
  public async publish(data: any) {
    await this.publisher.publish(
      String(Channels.HTTP_NODE_STATUS),
      JSON.stringify(data),
    );
  }

  public async subscribe(): Promise<Redis> {
    await this.subscriber.subscribe(String(Channels.HTTP_NODE_STATUS));
    return this.subscriber;
  }
}
