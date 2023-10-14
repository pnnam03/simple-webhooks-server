import '0prelude';

import {app} from './app';
import {logger} from './logger';

app.listen({port: 8000, host: '0.0.0.0'}, (err, addr) => {
  if (err) {
    app.log.error('Terminating...\nError: ', err);
    process.exit(1);
  }
  logger.info(`Server listening on ${addr}`);
});
