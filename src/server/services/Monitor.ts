import { client } from '../controller/redisController';
import {
  Request,
  Response,
  Router,
  NextFunction,
  RequestHandler
} from 'express';
import {Redis, Callback} from 'ioredis'
console.log('hi');
console.log(client);


class Monitor {
  isOn: boolean;
  client: any;

  constructor() {
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

  monitor = async () => {
    try {
      this.client.monitor((err : Error, monitor : any) : void => {
  // Entering monitoring mode.
        monitor.on('monitor', function (time : string, args: string[], source : string, database : string) {
          const [key, value] = args
          if (args[0] === 'get') this.keyspaceMissCheck(key, value)
        });
      });
    } catch (err) {
      console.log(err)
    }
  }

  keyspaceMissCheck = async (key:string, value:string) => {
    this.client.info((info : any)=> {
      console.log(info)
    })
    // query db info
    // if keyspace miss is increased
      // log keyspace miss in mongo for key
    
  }
}

export const monitor = new Monitor();
