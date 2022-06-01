// const cookieController = require('../controllers/cookieController')
const express = require('express');
import { redisController } from '../controller/redisController';
import { mongoController } from '../controller/mongoController';
const router = express.Router();
import { Request, Response, Router, NextFunction } from 'express';


//READ 2 - get live value for a live key
router.get('/api/getLiveValue/:key', redisController.getLiveValue, (req: Request, res: Response) => {
    res.status(200).send(res.locals.liveValue);
}); 

//READ 3 - get live values for given keys
router.get('/api/getLiveValues/:keys', redisController.getLiveValues, (req: Request, res: Response) => {
    res.status(200).send(res.locals.liveValues);
}); 

//READ 4 -  get all live keys for given keys
router.get('/api/getAllLiveKeys/:keys', redisController.getAllLiveKeys, (req: Request, res: Response) => {
    res.status(200).send(res.locals.allLiveKeys);
}); 


//READ 5
router.get('/api/getValueRecords/:key', mongoController.getValueRecords, (req: Request, res: Response) => {
    res.status(200).send(res.locals.valueRecords);
}); 


// //READ 6
// router.get('/api.getLiveAndExpiredKeyRecord/:key', mongoController.getLiveAndExpiredKeyRecord, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.LiveAndExpiredKeyRecord);
// }); 


// //READ 7

// router.get('/api.getTTLforKey/:key', mongoController.getTTLforKey, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.ttl);
//     res.send(res.locals.value);
// }); 

// //CREATE 1 - create key value pair
// router.post('/api.createKVP', redisController.createKVP, mongoController.getKey, mongoController.createKVP, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.kvPair);
// });

// //CREATE 2 - create key value pair with TTL
// router.post('/api.createKVPTTL', redisController.createKVPTTL, mongoController.getKey, mongoController.createKVPTTL, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.createKVPTTL);
// });


// //UPDATE 1 - update key name
// router.patch('/api/updateKeyName', redisController.updateKeyName, mongoController.updateKeyName, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.newKeyName);
// });

// //UPDATE 2 - update value
// router.patch('/api/updateValue', redisController.updateValue, mongoController.updateValue, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.newValue);
// });

// //UPDATE 3 - append value
// router.patch('/api/appendValue', redisController.appendValue, mongoController.appendValue, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.newValue);
// });

    
// //UPDATE 4 - add/set expiration time for key
// router.patch('/api/addExpireTime', redisController.appendValue, mongoController.appendValue, (req: Request, res: Response) => {
//     res.status(200);
//     res.send(res.locals.addExpireTime);
// });    

    
// //UPDATE 4 - remove expiration time for key
// router.patch('/api/removeExpireTime', redisController.removeExpireTime, mongoController.    removeExpireTime, (req: Request, res: Response) => {
//     res.status(200);
// });


// //DELETE 1 - delete key 
// router.patch('/api/deleteKey', redisController.deleteKey, mongoController.deleteKey, (req: Request, res: Response) => {
//     res.status(200);
// });

export const apiRouter = router;