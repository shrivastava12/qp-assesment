import * as express from 'express';
import { bootstrap } from './api';

const expressApp = express();
console.log(process.env.DATABASE_URL, 'Testing');
//Start the API locally
bootstrap(expressApp).then((app) => {
  const port = process.env.PORT;
  const apiPrefix = process.env.API_PREFIX;
  app.listen(port).then(() => {
    console.log(
      `API is listening at http://localhost:${port || 3000}${apiPrefix || ''}`,
    );
  });
});
