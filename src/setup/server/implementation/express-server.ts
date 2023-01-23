import * as express from 'express';
import { singleton } from 'tsyringe';
import { HttpMethod, HttpServer } from '../http-server';

import {
  Request as RequestExpress,
  Response as ResponseExpresss,
  NextFunction,
} from 'express';
export type Request = RequestExpress;
export type Response = ResponseExpresss;
export type Next = NextFunction;

@singleton()
export class ExpressServer implements HttpServer {
  private app: express.Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  setRoute(method: HttpMethod, route: string, callback: Function) {
    this.app[method](route, callback);
  }

  addMiddleware(callback: any, path?: string) {
    if (path) {
      this.app.use(path, callback);
    } else {
      this.app.use(callback);
    }
  }

  start(port: number) {
    this.app.listen(port, () => console.log(`SERVER STARTED IN PORT ${port}`));
  }
}
