import { inject, injectable } from 'tsyringe';
import { Authentication } from '../authentication';
import { Login, LoginResponse } from '../login';

@injectable()
export class LoginService implements Login {
  private defaultUser = process.env.DEFAULT_USERNAME;
  private defaultPassword = process.env.DEFAULT_PASSWORD;

  constructor(
    @inject('Authentication') private authentication: Authentication,
  ) {}

  execute(user: string, password: string): LoginResponse {
    if (this.defaultUser === user && this.defaultPassword === password) {
      return {
        validLogin: true,
        tokenData: this.authentication.generateToken({ user }),
      };
    }
    return {
      validLogin: false,
      message: 'Invalid username or password!',
    };
  }
}
