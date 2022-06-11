import { client } from './redisController';
import {
  Request,
  Response,
  Router,
  NextFunction,
  RequestHandler
} from 'express';

// TODO: route all monitor requests to here, and import Monitor
/**
 * @types
 */
interface monitorController {
  onMonitorRedis: RequestHandler;
  offMonitorRedis: RequestHandler;
  keyspaceMissCheck: RequestHandler;
}
/**
 * @variables
 */
const defaultErr = (err: Error, middlewareName: string, num = 500) => {
  return {
    log: `ERROR found in monitorController.${middlewareName}`,
    status: num,
    message: { err }
  };
};

/**
 * @middleware
 *
 *
 */
export const monitorController: monitorController = {
  // turn monitor on
  onMonitorRedis: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const monitor = await client.monitor();
      monitor.on('monitor', (time: any, args: any, source: any, db: any) => {
        console.log('Monitoring redis');
        if (args[0] === 'get') {
          // invoke info, look for keyspace miss, if keyspace miss, log arg[1] keyspace miss +1 in mongo
          //monitorController.keyspaceMissCheck(args[0], args[1])
        }
      });
    } catch (err) {
      return next(defaultErr(err, 'onMonitorRedis'));
    }
  },

  offMonitorRedis: (req: Request, res: Response, next: NextFunction) => {},

  keyspaceMissCheck: (key: any, value: any) => {
    // check if info.keyspacemiss has increased
    // fetch request to mongo, increasing that key's keyspace miss value
  }
};
