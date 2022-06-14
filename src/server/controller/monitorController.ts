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
  keyspaceMissCheck: (key: any, value: any) => {
    // check if info.keyspacemiss has increased
    client.info((info: any) => console.log('info:', info));
    // fetch request to mongo, increasing that key's keyspace miss value
  },
  // turn monitor on
  onMonitorRedis: async (req: Request, res: Response, next: NextFunction) => {
    try {
      client
      .info('stats')
      .then((result: any) => console.log('before monitor on', result));
      
      client.monitor((err: Error, monitor: any): void => {
        // Entering monitoring mode.
        monitor.on(
          'monitor',
          function (
            time: string,
            args: string[],
            source: string,
            database: string
          ) {
            console.log(time);
            console.log(args);
            console.log(source);
            console.log(database);
            const [command, key] = args;
            if (args[0] === 'get')
              client
                .info('stats')
                .then((result: any) => console.log(result));
          }
        );
      });
      return next();
    } catch (err) {
      return next(defaultErr(err, 'onMonitorRedis'));
    }
  },

  offMonitorRedis: (req: Request, res: Response, next: NextFunction) => {}
};
