import {createBullBoard} from '@bull-board/api';
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter.js';
import {FastifyAdapter} from '@bull-board/fastify';
import type {Queue} from 'bullmq';
import type {FastifyPluginCallback} from 'fastify';

const webhooksBoard: FastifyPluginCallback<{
  queues: Queue;
  path?: string;
}> = (fastify, {queues, path = '/bullboard'}, done) => {
  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues: [new BullMQAdapter(queues)],
    serverAdapter,
  });

  serverAdapter.setBasePath(path);
  fastify.register(serverAdapter.registerPlugin(), {prefix: path});
  done();
};

export default webhooksBoard;
