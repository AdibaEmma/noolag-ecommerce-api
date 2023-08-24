import {Injectable} from '@nestjs/common';
import * as Redis from 'ioredis';
import {redisConfig} from 'redis.config';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis.Redis(redisConfig);
  }

  async set(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return JSON.parse(value);
  }
}
