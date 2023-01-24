import { inject, injectable } from 'tsyringe';

import {
  Request,
  Response,
  Next,
} from 'src/setup/server/implementation/express-server';
import { Authentication } from 'src/auth/services/authentication';
import { HttpServer } from 'src/setup/server/http-server';
import { Middleware } from '../middleware';

@injectable()
export class AuthMiddleware implements Middleware {
  constructor(
    @inject('Authentication') private authentication: Authentication,
  ) {}

  add = (httpServer: HttpServer) => {
    httpServer.addMiddleware(this.checkToken, '*');
  };

  private checkToken = async (req: Request, res: Response, next: Next) => {
    if (req.baseUrl.includes('login')) {
      return next();
    }
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = this.detachTokenFromAuthorization(authorization);
      const isValid = await this.authentication.validToken(token);
      if (isValid) {
        return next();
      }
    }
    return res.status(401).send();
  };

  private detachTokenFromAuthorization = (authorization: string) => {
    const authType = 'Bearer ';
    return authorization.slice(
      authorization.indexOf(authType) + authType.length,
    );
  };
}
