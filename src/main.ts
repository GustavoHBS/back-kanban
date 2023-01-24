import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { container, inject } from 'tsyringe';
import { route } from './setup/routes';
import './setup/dependecy-injection';
import { HttpServer } from './setup/server/http-server';
import { middlewares } from './setup/middlewares';

class Main {
  constructor(@inject('HttpServer') httpServer: HttpServer) {
    middlewares(httpServer);
    route(httpServer);
    httpServer.start(5000);
  }
}

new Main(container.resolve('HttpServer'));
