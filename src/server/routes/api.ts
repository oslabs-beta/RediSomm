// const cookieController = require('../controllers/cookieController')
const express = require('express');
import { redisController } from '../controller/redisController';
import { mongoController } from '../controller/mongoController';
const router = express.Router();
import { Request, Response, Router, NextFunction } from 'express';



//READ 2 - get live value for a live key
router.get('/getLiveValue/:key', redisController.getLiveValue, (req: Request, res: Response) => {
    res.status(200).send(res.locals.liveValue);
}); 

//READ 3 - get live values for given keys
router.get('/getLiveValues/:keys', redisController.getLiveValues, (req: Request, res: Response) => {
    res.status(200).send(res.locals.liveValues);
}); 

//READ 4 -  get all live keys for given keys
router.get('/getAllLiveKeys/:keys', redisController.getAllLiveKeys, (req: Request, res: Response) => {
    res.status(200).send(res.locals.allLiveKeys);
}); 

//READ 5
router.get('/getValueRecords/:key', mongoController.getValueRecords, (req: Request, res: Response) => {
    res.status(200).send(res.locals.valueRecords);
}); 


//READ 6
router.get('/getLiveAndExpiredKeyRecord/:key', mongoController.getLiveAndExpiredKeyRecord, (req: Request, res: Response) => {
    res.status(200).send(res.locals.keyRecord);
}); 


// //READ 7

router.get('/getTTLforKey/:key', mongoController.getTTLforKey, (req: Request, res: Response) => {
    res.status(200).send(res.locals.ttl);
}); 

// //CREATE 1 - create key value pair

// router.post('/createKVP', redisController.createKVP, mongoController.getKey, mongoController.createKVP, (req: Request, res: Response) => {
//     res.status(200).send(res.locals.kvPair);
// });

// //CREATE 2 - create key value pair with TTL
// router.post('/createKVPTTL', redisController.createKVPTTL, mongoController.getKey, mongoController.createKVPTTL, (req: Request, res: Response) => {
//     res.status(200).send(res.locals.createKVPTTL);
// });


// //UPDATE 1 - update key name
// router.patch('/updateKeyName', redisController.updateKeyName, mongoController.updateKeyName, (req: Request, res: Response) => {
//     res.status(200).send(res.locals.newKeyName);
// });

// //UPDATE 2 - update value
// router.patch('/updateValue', redisController.updateValue, mongoController.updateValue, (req: Request, res: Response) => {
//     res.status(200).send(res.locals.newValue);
// });

// //UPDATE 3 - append value
// router.patch('/appendValue', redisController.appendValue, mongoController.appendValue, (req: Request, res: Response) => {
//     res.status(200).send(res.locals.newValue);
// });

    
// //UPDATE 4 - add/set expiration time for key
// router.patch('/addExpireTime', redisController.appendValue, mongoController.appendValue, (req: Request, res: Response) => {
//     res.status(200).send(res.locals.addExpireTime);
// });    

    
// //UPDATE 4 - remove expiration time for key
// router.patch('/removeExpireTime', redisController.removeExpireTime, mongoController.    removeExpireTime, (req: Request, res: Response) => {
//     res.status(200);
// });


// //DELETE 1 - delete key 
router.patch('/deleteKey', redisController.deleteKey, mongoController.deleteKey, (req: Request, res: Response) => {
    res.status(200);
});

export const apiRouter = router;