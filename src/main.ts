import * as express from 'express';
import { bootstrap } from './api';
import * as config from 'config';

const expressApp = express();

//Start the API locally
bootstrap(expressApp).then((app) => {
  const port = config.get<number>('PORT');
  const apiPrefix = config.get<string>('API_PREFIX');
  app.listen(port).then(() => {
    console.log(`API is listening at http://localhost:${port}${apiPrefix}`);
  });
});
