import {
  Request,
  Response,
  Router,
  NextFunction,
  RequestHandler
} from 'express';
import { Redis, Callback } from 'ioredis';

class Monitor {
  isOn: boolean;
  client: any;

  constructor(client: any) {
    this.isOn = false;
    this.client = client;
    this.on();
  }

  on = () => {
    this.isOn = true;
    this.monitor();
  };

  off = () => {
    this.isOn = false;
  };

  keyspaceCheck = async (key: string, value: string) => {
    this.client.info((info: any) => {
      console.log(info);
    });
  };

  monitor = async () => {
    try {
      this.client.monitor((err: Error, monitor: any): void => {
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
            const [key, value] = args;
            if (args[0] === 'get')
              () => {
                this.keyspaceCheck(key, value);
              };
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  // query db info
  // if keyspace miss is increased
  // log keyspace miss in mongo for key
}

export default Monitor;
