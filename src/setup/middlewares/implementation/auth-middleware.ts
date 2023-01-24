import { Authentication } from '../../../auth/services/authentication';
import { inject, injectable } from 'tsyringe';
import { HttpServer } from '../../server/http-server';

import { Middleware } from '../middleware';
import {
  Request,
  Response,
  Next,
} from 'src/setup/server/implementation/express-server';

@injectable()
export class AuthMiddleware implements Middleware {
  constructor(
    @inject('Authentication') private authentication: Authentication,
  ) {}

  add(httpServer: HttpServer) {
    httpServer.addMiddleware(this.checkToken, '*');
  }

  private checkToken = async (req: Request, res: Response, next: Next) => {
    if (req.baseUrl.includes('login')) {
      return next();
    }
    const token = req.headers.authorization;
    if (token) {
      const isValid = await this.authentication.validToken(token);
      if (isValid) {
        return next();
      }
    }
    return res.status(401).send();
  };
}
