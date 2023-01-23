import { HttpServer } from 'src/setup/server/http-server';

export interface Controller {
  registryRoutes(httpServer: HttpServer): void;
}
