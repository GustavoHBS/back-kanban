import { Request, Response } from "express";
import { HttpMethod, HttpServer } from "../../setup/server/http-server";
import { inject, injectable } from "tsyringe";
import { Login } from "../services/login";

@injectable()
export class LoginController {
    constructor(@inject("Login") private loginService: Login){}

    registryRoutes = (httpServer: HttpServer) => {
        httpServer.setRoute(HttpMethod.POST, '/login', this.login);
    }

    login = (request: Request, resp: Response) =>{
        const body = request.body;
        const response = this.loginService.execute(body.login, body.senha);
        if(response.validLogin){
            return resp.send(response.tokenData);
        }
        const INVALID_AUTH_STATUS = 401;
        return resp.status(INVALID_AUTH_STATUS).send({message: response.message});
    }
}