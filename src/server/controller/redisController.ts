// create redis client
const redis = require('redis');
const redisMockDB = 'redis-15765.c99.us-east-1-4.ec2.cloud.redislabs.com:15765'
const client = redis.createClient();  //OR SEE BELOW
// const client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,
// });
// By default, redis.createClient() will use 127.0.0.1 and 6379 as the hostname and port respectively
//import { Params, Query } from '../../types'
import { promisify } from "util";

// redis.js doesn't support async utils as of writing this article
// we can use the recommended workaround
export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
// We will use getAsync to get the values from Redis store and setAsync to set values in our Redis store.

import { Request, Response, Router, NextFunction } from 'express';

type Params = {
    key: string;
    keys: string;
};
// We need to modify our APIs to use Cache when we request data, via Get requests.


// app.get("/api/<resource>", async (req, res) => {
//     try {
//         // Get from cache using the "Key"
//         const getRes = await getAsync("resourceKey");
//         if (getRes)
//             return res.json({ success: true, data: JSON.parse(getRes) });

//         // On cache-miss => query database
//         const users = await <Model>.find({});

//         // Set cache
//         await setAsync("resourceKey",   // Key
//             JSON.stringify({ res }),        // Value
//             "EX",                         // Set explicit expiry
//             60                            // TTL in seconds
//         );

//         return res.status(200).json({ success: true, data: <resource>});
//     } catch (error) {
//         // Handle errors
//     }
// });
interface RequestParams extends Params {
    key: string
}
interface Key {
    key: String;
}

export const redisController = {
    //CREATE 1 - create key value pair
    createKVP: (req: Request , res: Response, next: NextFunction): void => {
        const { key, value }   = req.body;
        client.set(key, function (err: NodeJS.ErrnoException, reply: Buffer) {
            res.locals.kvPair = reply;
            return next();
        })
        .catch((err: NodeJS.ErrnoException) => {
            const defaultErr = {
                log: 'ERROR found in mongoController.getAllRecords',
                message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
        })
    },
    //CREATE 2 - create key value pair and TTL 
   createKVPTTL: (req: Request , res: Response, next: NextFunction): void => {
        const { key, value, ttl }   = req.body;
        client.setex(key, function (err: NodeJS.ErrnoException, reply: Buffer) {
            res.locals.createKVPTTL = reply;
            return next();
        })
        .catch((err: NodeJS.ErrnoException) => {
            const defaultErr = {
                log: 'ERROR found in mongoController.getAllRecords',
                message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
        })
    },
   //READ 1 IS IN API.TS
    //READ 2 - read live value from live key
    getLiveValue: (req: Request , res: Response, next: NextFunction): void => {
        const { key }   = req.params;
        client.get(key, function (err: NodeJS.ErrnoException, reply: Buffer) {
            res.locals.liveValue = reply;
            return next();
        })
        .catch((err: NodeJS.ErrnoException) => {
            const defaultErr = {
                log: 'ERROR found in mongoController.getAllRecords',
                message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
        })
    },
    //READ 3 - read live values for given keys
    getLiveValues: (req: Request, res: Response, next: NextFunction): void => {
        const { keys } = req.params;
        client.get(keys, function (err: NodeJS.ErrnoException, reply: Buffer) {
            res.locals.liveValues = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.getLiveValues',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },
    //READ 4 - get all live keys
    getAllLiveKeys: (req: Request, res: Response, next: NextFunction): void => {
        client.keys('*', function (err: NodeJS.ErrnoException, reply: Buffer) {
            res.locals.liveValue = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.getAllLiveKeys',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },

    //UPDATE 1 - update key name
    updateKeyName: (req: Request, res: Response, next: NextFunction): void => {
        client.rename('req.body.oldKeyName', 'req.body.newKeyName', function (err: NodeJS.ErrnoException, reply: Buffer) {
            const { oldKeyName, newKeyName } = req.body;
            res.locals.newKeyName = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.updateKeyName',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },
    //UPDATE 2 - update value to given key
    updateValue: (req: Request, res: Response, next: NextFunction): void => {
        client.set('req.body.keyName', 'req.body.newValue', function (err: NodeJS.ErrnoException, reply: Buffer) {
            const { keyName, newValue } = req.body;
            res.locals.newValue = reply;            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.updateValue',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },
 //UPDATE 3 - append value to given key
    appendValue: (req: Request, res: Response, next: NextFunction): void => {
        client.append('req.body.keyName', 'req.body.appendValue', function (err: NodeJS.ErrnoException, reply: Buffer) {
            const { keyName, appendValue } = req.body;
            res.locals.appendValue = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.appendValue',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },
 //UPDATE 4 - add expiration time
    addExpireTime: (req: Request, res: Response, next: NextFunction): void => {
        client.expire('req.body.keyName', 'req.body.expireTime', function (err: NodeJS.ErrnoException, reply: Buffer) {
            const { keyName, expireTime } = req.body;
            res.locals.expireTime = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.addExpireTime',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },
//UPDATE 4 - remove expiration time
    removeExpireTime: (req: Request, res: Response, next: NextFunction): void => {
        client.persist('req.body.keyName', 'req.body.expireTime', function (err: NodeJS.ErrnoException, reply: Buffer) {
            const { keyName, expireTime } = req.body;
            res.locals.expireTime = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.removeExpireTime',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },
//DELETE 1 - delete key
    deleteKey: (req: Request, res: Response, next: NextFunction): void => {
        client.del('req.body.keyName',  function (err: NodeJS.ErrnoException, reply: Buffer) {
            const { keyName } = req.body;
            res.locals.keyName = reply;
            return next();
        })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in mongoController.deleteKey',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    }














} // <- End bracket for redisController DO NOT DELETE





client.on('connect', function () {
    console.log('Redis Connected!');
});

