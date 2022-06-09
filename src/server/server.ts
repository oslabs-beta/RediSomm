import express from 'express';
const app = express();
const PORT = 8080;
const path = require('path');
import { apiRouter } from './routes/api';
import { mongoController } from './controller/mongoController';
import cors from 'cors';
import { Response, Request, NextFunction } from 'express';
// const userApiRouter = require('./routers/userApi.js');???
// const reviewApiRouter = require('./routers/reviewApi.js');???
// const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.static('../../.Webpack/renderer/assets'));
app.use(express.urlencoded());
// app.set('query parser', 'simple');

// app.use(cookieParser());

//READ 1
app.get(
  '/api/getAll',
  mongoController.getAllRecords,
  ({ req, res }: { req: any; res: any }) => {
    res.status(200).send(res.locals.allRecords);
  }
);

app.use('/api', apiRouter);

// GLOBAL ERROR HANDLER
  app.use((err: NodeJS.ErrnoException, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
