import { Transport } from '@nestjs/microservices';

export const redisConfig: any = {
    transport: Transport.REDIS,
    options: {
        url: 'redis://localhost:6379',
    },
};
