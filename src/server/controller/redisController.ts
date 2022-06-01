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
    //READ 2
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
    //READ 3
    getLiveValues: (req: Request, res: Response, next: NextFunction): void => {
        const { keys } = req.params;
        client.get(keys, function (err: NodeJS.ErrnoException, reply: Buffer) {
            res.locals.liveValues = reply;
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
    //READ 4 - get all live keys ????? CHECK THIS
    getAllLiveKeys: (req: Request, res: Response, next: NextFunction): void => {
        client.keys('*', function (err: NodeJS.ErrnoException, reply: Buffer) {
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
    }



} // <- End bracket for redisController DO NOT DELETE





client.on('connect', function () {
    console.log('Redis Connected!');
});

