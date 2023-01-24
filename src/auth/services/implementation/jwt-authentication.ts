import * as jwt from 'jsonwebtoken';
import { Authentication } from '../authentication';
import { TokenData } from '../login';

export class JwtAuthentication implements Authentication {
  private secret = process.env.TOKEN_SECRET || 'secret_default';
  private expiresIn = parseInt(process.env.EXPIRES_IN || '36000');

  generateToken(data: Record<string, any>): TokenData {
    const expiresIn = this.expiresIn;
    return {
      token: jwt.sign(data, this.secret, {
        expiresIn,
      }),
      expiresIn,
    };
  }

  validToken(token: string): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(token, this.secret, function (err) {
        resolve(!err);
      });
    });
  }
}
