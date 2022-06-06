import { Request, Response, Router, NextFunction, RequestHandler } from 'express';

import { KeyData } from '../models/mongoModels';


type mongoController = {
    getAllRecords: RequestHandler, 
    getValueRecords: RequestHandler,
    getLiveAndExpiredKeyRecord: RequestHandler,
    getTTLforKey: RequestHandler
}

type resultObject = {
  value: String,
  ttl: Number,
}

// DATE FUNCTION TO STORE EXPIRATION DATE PASSING IN TTL(secs)
   
/** 
    Make a new instance of current date
    Replace the seconds of the “now” date by adding the ttl(secs) to the current time
    ---
    function ttlExpiration (ttl){
    date = new date ()
    date.setSeconds(date.getSeconds() + ttl)
    return date
 }
**/
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

//READ 5 - Get all expired records of an inputted Key
getValueRecords: (req: Request, res: Response, next: NextFunction): void => {
  const receivedKey = req.params.key;
    KeyData.find({ 'key': receivedKey, 'expired': true }, function (err: NodeJS.ErrnoException, result: Buffer){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getValueRecords',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.valueRecords = result;
    return next();
  });
},


//READ 6 - Get all live and expired records of an inputted Key
getLiveAndExpiredKeyRecord: (req: Request, res: Response, next: NextFunction): void => {
  const receivedKey = req.params.key;
    KeyData.find({ 'key': receivedKey }, function (err: NodeJS.ErrnoException, result: Buffer){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getLiveAndExpiredKeyRecord',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.keyRecord = result;
    return next();
  });
},

//READ 7
getTTLforKey: (req: Request, res: Response, next: NextFunction): void => {
  const key = req.params.key;
    KeyData.findOne({ 'key': key, "expire": false }, function (err: NodeJS.ErrnoException, result: resultObject){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getTTlforKey',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.ttl = { 'value' :result.value, 'ttl': result.ttl };
    return next();
  });
},

//CREATE 1

//CREATE 2

//UPDATE 1

//UPDATE 2

//UPDATE 3

//UPDATE 4

//UPDATE 5

//DELETE 1
};
