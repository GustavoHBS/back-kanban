import * as jwt from 'jsonwebtoken';
import { Authentication } from '../authentication';

export class JwtAuthentication implements Authentication {
  private secret = process.env.TOKEN_SECRET || 'secret_default';
  private expiresIn = process.env.EXPIRES_IN || 36000;

  generateToken(data: Record<string, any>) {
    const expiresIn = this.expiresIn;
    return {
      token: jwt.sign(data, this.secret, {
        expiresIn,
      }),
      expiresIn,
    };
  }

  validToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, this.secret, function (err) {
        resolve(!err);
      });
    });
  }
}
