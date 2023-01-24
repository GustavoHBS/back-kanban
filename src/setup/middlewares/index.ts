import { HttpServer } from '../server/http-server';
import { container, InjectionToken } from 'tsyringe';
import { AuthMiddleware } from './implementation/auth-middleware';
import { Middleware } from './middleware';
import { LogMiddleware } from './implementation/log-middleware';

export const middlewares = (httpServer: HttpServer) => {
  const middlewares: InjectionToken<Middleware>[] = [
    AuthMiddleware,
    LogMiddleware,
  ];
  middlewares.forEach((middleware) => {
    const middlewareResolved = container.resolve(middleware);
    middlewareResolved.add(httpServer);
  });
};
