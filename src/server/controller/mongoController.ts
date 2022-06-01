import { Request, Response, Router, NextFunction, RequestHandler } from 'express';

import { KeyData } from '../models/mongoModels';


type mongoController = {
    getAllRecords: RequestHandler, 
    getValueRecords: RequestHandler,
}

export const mongoController: mongoController = {

// READ 1 - Get all Records
getAllRecords: (req: Request, res: Response, next: NextFunction): void => {
        KeyData.find({}, function (err: NodeJS.ErrnoException, result: Buffer){
        if (err) {
            const defaultErr = {
                log: 'ERROR found in mongoController.getAllRecords',
                message: { err: `There was an error ${err}` },
              };
              return next(defaultErr);
        }
        res.locals.allRecords = result;
        return next();
      });
    },

//READ 5
getValueRecords: (req: Request, res: Response, next: NextFunction): void => {
    const { key } = req.params;
    KeyData.find({ key: key, expired: true }, function (err: NodeJS.ErrnoException, result: Buffer){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getLiveValue',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.valueRecords = result;
    return next();
  });
}

//READ 3
  
//READ 4

//READ 5

//READ 6

//READ 7

//CREATE 1

//CREATE 2

//UPDATE 1
};
