import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RedisClientType, createClient } from 'redis';

import { AppError } from '@shared/errors/AppError';

const redisClient: RedisClientType = createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
});

const limiter: RateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 5,
});

export const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await redisClient.connect();

    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests!', 429);
  } finally {
    await redisClient.disconnect();
  }
};
