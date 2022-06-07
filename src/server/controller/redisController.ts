const Redis = require("ioredis");
const redisMockDB = 'redis-15765.c99.us-east-1-4.ec2.cloud.redislabs.com:15765';
const USERNAME_REDIS = 'default';
const PASSWORD_REDIS = 'SgIZ6wpz8FoVU37hZ0kycjRRTyXjHZpH';
const PORT_REDIS = process.env.PORT || 6379;
const HOST_REDIS = process.env.HOST || '127.0.0.1';
const client = new Redis({
        uri: 'redis://USERNAME_REDIS:PASSWORD_REDIS@HOST_REDIS:PORT_REDIS/redisMockDB'
    // host: HOST_REDIS,
    // port: PORT_REDIS,
    // password: 'SgIZ6wpz8FoVU37hZ0kycjRRTyXjHZpH'
    //removed password because I got an error msg that said "default" user does not require a password
});

// By default, redis.createClient() will use 127.0.0.1 and 6379 as the hostname and port respectively


client.on('connect', () => 
    console.log('Redis is Connected!'));
        
   client.on('error',  (err: NodeJS.ErrnoException) =>    console.log('Redis Client Error!', err)
); 

// redis.js doesn't support async utils as of writing this article
// we can use the recommended workaround
// export const getAsync = promisify(client.get).bind(client);
// export const setAsync = promisify(client.set).bind(client);
// We will use getAsync to get the values from Redis store and setAsync to set values in our Redis store.



import { Request, Response, Router, NextFunction, RequestHandler } from 'express';
import { getNodeMajorVersion } from 'typescript';
import { callbackify } from 'util';

type Params = {
    key: string;
    keys: string;
};
// We need to modify our APIs to use Cache when we request data, via Get requests.



interface RequestParams extends Params {
    key: string
}
interface Key {
    key: String;
}
type redisController = {
    createKVP: RequestHandler, 
    createKVPTTL: RequestHandler,
    getLiveValue: RequestHandler,
    getLiveValues: RequestHandler,
    getAllLiveKeys:RequestHandler,
    updateKeyName: RequestHandler,
    updateValue: RequestHandler,
    appendValue: RequestHandler,
    addExpireTime: RequestHandler,
    removeExpireTime: RequestHandler,
    deleteKey: RequestHandler
}
//  If you do not provide a callback function, the ioredis function returns a promise which resolves to "OK" when the command succeeds.The first argument is usually the Redis key to run the command against. You can also add an optional error first callback function after the other arguments.

export const redisController: redisController = {
//CREATE 1 - create key value pair
    createKVP:   async (req: Request, res: Response, next: NextFunction) => {
            const { key, value } = req.body;
        try {
            const result = await client.set(key, value);    
            if (result === "OK") {
                res.locals.key = key;
                res.locals.value = value;
                return next();
            }
  } catch (err) {
                const defaultErr = {
                    log: 'ERROR found in redisController.createKVP',
                    message: { err: `There was an error ${err}` }
                };
                    return next(defaultErr);
                }
},
//CREATE 2 - create key value pair and TTL ****TEST IN POSTMAN WHEN MONGO CONTROLLERS ARE DONE***
   createKVPTTL: async (req: Request , res: Response, next: NextFunction) => {
       const { key, value, ttl } = req.body;
               try {
                   const result = await client.setex(key, value, ttl); 
                    if (result === "OK") {
                        res.locals.key = key;
                        res.locals.value = value;
                        res.locals.ttl = ttl;
                        return next();
            }
        } catch(err) {
            const defaultErr = {
                log: 'ERROR found in redisController.createKVPTTL',
                message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
        }
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
    //READ 4 - FOR TESTING ONLY get all live keys
    getAllLiveKeys: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await client.keys('*');
              if (result === "OK") {
                res.locals.liveValues = result;

                        return next();
            }
            
                if (err) {
                   const defaultErr = {
                log: 'ERROR found in redisController.getAllLiveKeys',
                message: { err: `There was an error ${err}` },
              };
              return next(defaultErr);
       }
        res.locals.liveValues = replies;
        return next();
      });    
    },
    //READ 4 - get all live keys
    // getAllRecords: (req: Request, res: Response, next: NextFunction): void => {
    //     KeyData.find({}, function (err: NodeJS.ErrnoException, result: Buffer){
    //     if (err) {
    //         const defaultErr = {
    //             log: 'ERROR found in mongoController.getAllRecords',
    //             message: { err: `There was an error ${err}` },
    //           };
    //           return next(defaultErr);
    //     }
    //     res.locals.allRecords = result;
    //     return next();
    //   });
    // }
   /*getAllLiveKeys: (req: Request, res: Response, next: NextFunction): void => {
        // console.log(req);
                  console.log('hi');

       client.keys('*', function (err: NodeJS.ErrnoException, replies: Buffer) {
           console.log(replies);
           res.locals.liveValues = replies;
           console.log(err);
           return next(res.locals.liveValues);
       })
            .catch((err: NodeJS.ErrnoException) => {
                const defaultErr = {
                    log: 'ERROR found in redisController.getAllLiveKeys',
                    message: { err: `There was an error ${err}` },
                };
                return next(defaultErr);
            })
    },*/

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



console.log("after");


// module.exports.init = () => {
//     const cacheInstance = redis.createClient('redis://redis-15765.c99.us-east-1-4.ec2.cloud.redislabs.com:15765');
//     clients.cacheInstance = cacheInstance;};
// module.exports.getClients = () => {};
// module.exports.closeConnections = () => {};
