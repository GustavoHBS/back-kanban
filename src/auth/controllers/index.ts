import { HttpMethod, HttpServer } from '../../setup/server/http-server';
import { inject, injectable } from 'tsyringe';
import { Login } from '../services/login';
import {
  Request,
  Response,
} from '../../setup/server/implementation/express-server';
import { Controller } from 'src/shared/interfaces/controller';

@injectable()
export class LoginController implements Controller {
  constructor(@inject('Login') private loginService: Login) {}

  registryRoutes = (httpServer: HttpServer) => {
    httpServer.setRoute(HttpMethod.POST, '/login', this.login);
  };

  login = (request: Request, resp: Response) => {
    const body = request.body;
    const response = this.loginService.execute(body.login, body.senha);
    if (response.validLogin) {
      return resp.send(response.tokenData);
    }
    const INVALID_AUTH_STATUS = 401;
    return resp.status(INVALID_AUTH_STATUS).send({ message: response.message });
  };
}
