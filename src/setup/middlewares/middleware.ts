import { HttpServer } from '../server/http-server';

export interface Middleware {
  add(httpServer: HttpServer): void;
}
