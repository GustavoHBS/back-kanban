import { HttpServer, HttpMethod } from 'src/setup/server/http-server';
import {
  Request,
  Response,
} from 'src/setup/server/implementation/express-server';
import { HTTP_STATUS } from 'src/shared/enums/http-status';
import { Controller } from 'src/shared/interfaces/controller';
import { inject, injectable } from 'tsyringe';
import { Login } from '../services/login';

@injectable()
export class LoginController implements Controller {
  constructor(@inject('Login') private loginService: Login) {}

  registryRoutes = (httpServer: HttpServer) => {
    httpServer.setRoute(HttpMethod.POST, '/login', this.login);
  };

  login = (request: Request, resp: Response) => {
    const body = request.body;
    const response = this.loginService.execute(body.login, body.senha);
    return response.validLogin
      ? resp.send(response.tokenData)
      : resp
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: response.message });
  };
}
