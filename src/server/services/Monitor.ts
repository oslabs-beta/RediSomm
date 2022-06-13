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

  keyspaceCheck = (key: string) => {
    this.client
      .info()
      .then((result: Buffer) => console.log('info result:', result));
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
            const [command, key] = args;
            if (args[0] === 'get') this.client.info();
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
