import type {Job} from 'bullmq';
import {Queue, Worker} from 'bullmq';
import dotenv from 'dotenv';
import Redis from 'ioredis';

import {logger} from './logger';

dotenv.config();

const REDIS_URL: string = process.env.REDIS_URL ?? 'http://localhost:6379';
const redisURL = new URL(REDIS_URL);

const connection = new Redis({
  host: redisURL.hostname,
  port: parseInt(redisURL.port, 10) || 80,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const webhooksQueue = new Queue('webhooks-queue', {
  connection,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const webhooksWorker = new Worker(
  'webhooks-queue',
  async (job: Job) => {
    logger.debug(`Req ID: ${job.id}`);
  },
  {
    connection,
  }
);

export {webhooksQueue, webhooksWorker};
