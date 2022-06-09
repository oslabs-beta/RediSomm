import { ColumnRowGroupChangeRequestEvent } from 'ag-grid-community';
import { Request, Response, Router, NextFunction, RequestHandler } from 'express';

import { KeyData } from '../models/mongoModels';


type mongoController = {
  getAllRecords: RequestHandler, 
  getValueRecords: RequestHandler,
  getLiveAndExpiredKeyRecord: RequestHandler,
  getTTLforKey: RequestHandler,
  getKey: RequestHandler,
  createKVP: RequestHandler,
  createKVPTTL: RequestHandler,
  deleteKey: RequestHandler,
  updateKeyName: RequestHandler,
  updateValue: RequestHandler,
  expireTime: RequestHandler,
  removeExpireTime: RequestHandler,
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


//READ 6 - GET ALL LIVE AND EXPIRED RECORDS OF AN INPUTTD KEY 
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

//READ 7 - GET TLL EXPIRATION DATE FOR GIVEN KEY **NEED TO WORK OUT TTL DATE FUNCTION** 
getTTLforKey: (req: Request, res: Response, next: NextFunction): void => {
  const key = req.params.key;
    KeyData.findOne({ 'key': key, "expired": false }, function (err: NodeJS.ErrnoException, result: resultObject){
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

//GET KEY
getKey: (req: Request, res: Response, next: NextFunction): void => {
  const { key, value }  = req.body;
    KeyData.findOne({ 'key': key, 'value': value }, function (err: NodeJS.ErrnoException, result: resultObject){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getKey',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    if (result !== undefined){
      res.locals.exists = true; 
    } else{
      res.locals.exists = false;
    }
    return next();
  });
},

//CREATE 1 - CREATE KVP GIVEN KEY AND VALUE
createKVP: (req: Request, res: Response, next: NextFunction): void => {
  const { key, value }  = req.body;

  if (!res.locals.exists){
    const newKVP = { 
      'key': key, 
      'value': value,
      }
    KeyData.create( newKVP , function (err: NodeJS.ErrnoException, result: resultObject){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getKey',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.kvPair = result;
    return next();
  });
  } else {
      const existingKey = KeyData.findOne({'key': key, 'value': value, 'expired': false}, function (err: NodeJS.ErrnoException, result: resultObject){
        if (err) {
            const defaultErr = {
                log: 'ERROR found in mongoController.getKey',
                message: { err: `There was an error ${err}` },
              };
              return next(defaultErr);
        }
        res.locals.kvPair = result;
        // need to finish
        return next();
      })
  }
},

//CREATE 2
createKVPTTL: (req: Request, res: Response, next: NextFunction): void => {
  const { key, value, ttl}  = req.body;

  if (!res.locals.exists){
    const newKVP = { 
      'key': key, 
      'value': value,
      'ttl': ttl
      }
    KeyData.create( newKVP , function (err: NodeJS.ErrnoException, result: resultObject){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.getKey',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.kvPair = result;
    return next();
  });
  } else {
      const existingKey = KeyData.findOne({'key': key, 'value': value, 'expired': false}, function (err: NodeJS.ErrnoException, result: resultObject){
        if (err) {
            const defaultErr = {
                log: 'ERROR found in mongoController.getKey',
                message: { err: `There was an error ${err}` },
              };
              return next(defaultErr);
        }
        res.locals.kvPair = result;
        // need to finish
        return next();
      })
  }
},

//UPDATE 1 - USER TO REPLACE KEY NAME WITH NEW KEY NAME - In Mongo, find oldKey and create a copy. Update copy with new key name.
updateKeyName: (req: Request, res: Response, next: NextFunction): void => {
  const { oldKeyName, newKeyName } = req.body;
    KeyData.findOneAndUpdate({ 'key': oldKeyName, 'expired': false }, { 'expired': true, }, function (err: NodeJS.ErrnoException, result: Buffer){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.updateKeyName',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    };

    // COPY AND SAVE OLD KEY WITH NEW KEY NAME
    let oldKey = result
    const newKey = new KeyData(oldKey);
    newKey.save()

    // FIND NEW KEY AND UPDATE EXPIRED TO TRUE AND PUSH OLDKEYNAME TO OLDKEYNAMES ARRAY
    KeyData.findOneAndUpdate({ 'key': newKey }, { $push: { oldKeyNames: oldKeyName }, 'expired': false,  }, function (err: NodeJS.ErrnoException, result: resultObject){
      if (err) {
          const defaultErr = {
              log: 'ERROR found in mongoController.updateKeyName',
              message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
      };
      return next();
    });
  });
},

//UPDATE 2 - USER TO UPDATE VALUE OF A GIVEN KEY - In Mongo, find key and update value property with new value. Push old value to oldValues array.
updateValue: (req: Request, res: Response, next: NextFunction): void => {
  const { key, newValue } = req.body;
  // FIND GIVEN KEY AND GRAB OLDVALUE
    KeyData.findOne({ 'key': key, 'expired': false }, function (err: NodeJS.ErrnoException, result: resultObject){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.updateValue',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
   const oldValue = result.value;
    // FIND AND UPDATE GIVEN KEY WITH NEW VALUE AND PUSH OLD VALUE TO OLDVALUES ARRAY
    KeyData.findOneAndUpdate({ 'key': key, 'expired': false }, { 'value' : newValue, $push: { oldValues: oldValue} }, function (err: NodeJS.ErrnoException, result: Buffer){
      if (err) {
          const defaultErr = {
              log: 'ERROR found in mongoController.updateValue',
              message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
      }
      res.locals.newValue = result;
    return next();
  });
});
},


//UPDATE 3

//UPDATE 4 - USER TO SET EXPIRE TIME FOR GIVEN LIVE KEY -  In Mongo, update expirationTime property from a date to null. **NEED TO WORK OUT TTL DATE FUNCTION**
expireTime: (req: Request, res: Response, next: NextFunction): void => {
  const { key, expireTime } = req.body;
    KeyData.findOneAndUpdate({ 'key': key, 'expired': false }, { 'ttl': expireTime }, function (err: NodeJS.ErrnoException, result: Buffer){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.removeExpireTime',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    res.locals.expireTime = result;
    return next();
  });
},


//UPDATE 5 - USER TO REMOVE EXPIRATION TIME OF A GIVEN KEY - In Mongo, update expirationTime property from a date to null.
removeExpireTime: (req: Request, res: Response, next: NextFunction): void => {
  const { key } = req.body;
    KeyData.findOneAndUpdate({ 'key': key, 'expired': false }, { 'expirationTime': null }, function (err: NodeJS.ErrnoException, result: Buffer){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.removeExpireTime',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    return next();
  });
},


//DELETE 1 - USER TO DELETE GIVEN KEY - In Mongo, update expired property from false to true & manualDelete from null to true.
deleteKey: (req: Request, res: Response, next: NextFunction): void => {
  const key = req.params.key;
    KeyData.findOneAndUpdate({ 'key': key, 'expired': false }, { 'expired': true, 'manualDelete': true }, function (err: NodeJS.ErrnoException, result: resultObject){
    if (err) {
        const defaultErr = {
            log: 'ERROR found in mongoController.deleteKey',
            message: { err: `There was an error ${err}` },
          };
          return next(defaultErr);
    }
    return next();
  });
},
};
