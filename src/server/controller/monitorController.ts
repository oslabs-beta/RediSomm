import { client } from './redisController';
import Monitor from '../services/Monitor';
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
      const monitor = new Monitor(client);
      console.log('monitoring redis');
      return next();
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
