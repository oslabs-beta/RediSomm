const express = require('express');
import { redisController } from '../controller/redisController';
import { mongoController } from '../controller/mongoController';
import { monitorController } from '../controller/monitorController';
const route = express.Router();
import { Request, Response, NextFunction } from 'express';


// route to monitor controller
route.post(
    '/monitor',
    mongoController.updateKeyspace,
    (req: Request, res: Response) => {
      return res.status(40).send('monitor is on!');
    }
  );


export const dbRouter = route;