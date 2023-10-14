import Fastify from 'fastify';

import webhooksBoard from './bullBoard';
import type {ReqData} from './types';
import {webhooksQueue} from './webhooksInstance';

const app = Fastify({
  logger: false,
});

app.register(webhooksBoard, {
  queues: webhooksQueue,
});

app.get('/', (req, rep) => {
  rep.send({hello: 'world'});
});

app.post('/handler', (req, rep) => {
  const requestData: ReqData = {
    headers: req.headers,
    body: req.body,
    ip: req.ip,
    hostname: req.hostname,
    url: req.url,
  };

  rep.send({log: requestData});
  webhooksQueue.add(requestData.hostname, requestData);

  //   fileLogger(requestData, 'output.json');
});

export {app, webhooksQueue};
