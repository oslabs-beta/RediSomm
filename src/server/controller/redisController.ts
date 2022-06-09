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
    // multiplekeys: string[];
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

// All arguments are passed directly to the redis server, so technically ioredis supports all Redis commands.
// The format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
// so the following statement is equivalent to the CLI: `redis> SET mykey hello EX 10`******(SHOW THIS TO ANDREW*******)

export const redisController: redisController = {
//CREATE 1 - create key value pair - DONE
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
//CREATE 2 - create key value pair and TTL - DONE FOR REDIS ONLY  (TBD ****TEST IN POSTMAN WHEN MONGO CONTROLLERS ARE DONE***)
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
   //READ 1 IS IN API.TS - DONE
    //READ 2 - read live value from live key-DONE
    getLiveValue: async (req: Request, res: Response, next: NextFunction) => {
        const { key } = req.params;
         try {
                await client.get(key)
                .then((result: Buffer) => {
                if (result) {
                    console.log('Print result here:', result);
                    res.locals.liveValue = result;
                    return next();
                }
                
            });
        } 
         catch(err)  {
                 const defaultErr = {
                    log: 'ERROR found in mredisController.getLiveValue',
                     message: { err: `There was an error ${err}` },
                 };
                 return next(defaultErr);
             }
    },
    //READ 3 - read live values for given keys-DONE
    getLiveValues: async (req: Request, res: Response, next: NextFunction) => {
        const { keys } = req.query;
        try {
            await client.mget(keys).then((result: Buffer) => {
                if (result) {
                    console.log('Print result here:', result);
                    res.locals.liveValues = result;
                    return next();
                }
                
            });
        } 
         catch(err)  {
                 const defaultErr = {
                    log: 'ERROR found in mredisController.getLiveValues',
                     message: { err: `There was an error ${err}` },
                 };
                 return next(defaultErr);
             }
    },
    //READ 4 - GET ALL LIVE KEYS - DONE
    getAllLiveKeys: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await client.keys('*').then((result: Buffer) => {
                if (result) {
                    console.log('Print result here:', result);
                    res.locals.allLiveKeys = result;
                    return next();
                }
                
            });            
            }
        catch (err) {
            const defaultErr = {
                log: 'ERROR found in redisController.getAllLiveKeys',
                message: { err: `There was an error ${err}` },
            };
            return next(defaultErr);
        }
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
//DELETE 1 - delete key - DONE
    deleteKey: async (req: Request, res: Response, next: NextFunction) => {
        //****CAN DEL COMMAND DELETE MORE THAN ONE KVP AT A TIME, IF SO CHANGE COND ON RESULT TO GT THAN 0 */
        const { key } = req.params;
        console.log(req.params);
        console.log('hiya');
         try {
                await client.del(key)
                .then((result: Buffer) => {
                    if (result) {
                    //promse returns a result of 1 if kvp is deleted but TS is not responding to number type, maybe there is an alterative to buffer that will read a num 
                    console.log('Print result here:', result);
                        res.locals.deletedKey = key;
                        // *****TO INCLUDE VALUE WITH KEY
                    return next();
                }
                
            });
        } 
         catch(err)  {
                 const defaultErr = {
                    log: 'ERROR found in mredisController.getLiveValue',
                     message: { err: `There was an error ${err}` },
                 };
                 return next(defaultErr);
             }
    }
    














} // <- End bracket for redisController DO NOT DELETE



console.log("after");


// module.exports.init = () => {
//     const cacheInstance = redis.createClient('redis://redis-15765.c99.us-east-1-4.ec2.cloud.redislabs.com:15765');
//     clients.cacheInstance = cacheInstance;};
// module.exports.getClients = () => {};
// module.exports.closeConnections = () => {};
