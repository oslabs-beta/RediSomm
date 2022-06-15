import { client } from './redisController';
import axios from 'axios';
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
    client.info().then((data: any) => {
      console.log(data.spilt(''));
    });
    // fetch request to mongo, increasing that key's keyspace miss value
  },
  // turn monitor on

  onMonitorRedis: async (req: Request, res: Response, next: NextFunction) => {
    let keyspaceMisses = 0;
    let keyspaceHits = 0;
    let newKeyspaceMisses = 0;
    let newKeyspaceHits = 0;

    try {
      client.info('stats').then((data: any) => {
        keyspaceHits = Number(
          data
            .substring(
              data.indexOf('keyspace_hits'),
              data.indexOf('keyspace_misses')
            )
            .split(':')[1]
        );
        keyspaceMisses = Number(
          data
            .substring(
              data.indexOf('keyspace_misses'),
              data.indexOf('pubsub_channels')
            )
            .split(':')[1]
        );
      });

      await client.monitor((err: Error, monitor: any): void => {
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
              client.info('stats').then((data1: any) => {
                // console.log('data1:', data1)
                newKeyspaceHits = Number(
                  data1
                    .substring(
                      data1.indexOf('keyspace_hits'),
                      data1.indexOf('keyspace_misses')
                    )
                    .split(':')[1]
                );
                newKeyspaceMisses = Number(
                  data1
                    .substring(
                      data1.indexOf('keyspace_misses'),
                      data1.indexOf('pubsub_channels')
                    )
                    .split(':')[1]
                );
                let missed;
                newKeyspaceMisses > keyspaceMisses
                  ? (missed = "keyspaceMiss")
                  : (missed = "keyspaceHits");
                console.log('NkeyspaceM', newKeyspaceMisses, 'keyspaceM', keyspaceMisses)
                console.log('missed:', missed);

                axios('http://localhost:8080/db/monitor', {
                  method: 'POST',
                  data: {
                    key: key,
                    keyspace: missed,
                    totalKeyspaceMisses: newKeyspaceMisses,
                    totalKeyspaceHits: newKeyspaceHits
                  }
                }).catch((err) => console.log(err));
              });
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
