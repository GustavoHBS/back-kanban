import { Request, Response } from "express";
import { HttpMethod, HttpServer } from "src/setup/server/http-server";
import { inject } from "tsyringe";
import { Login } from "../services/login";

export class LoginRoutes {
    constructor(@inject("HttpServer") httpServer: HttpServer,
    @inject("Login") private loginService: Login){
        httpServer.setRoute(HttpMethod.POST, '/login/', this.login);
    }

    login(request: Request, resp: Response){
        const body = request.body;
        const response = this.loginService.execute(body.login, body.senha);
        if(response.validLogin){
            return resp.send({token: response.token});
        }
        const INVALID_AUTH_STATUS = 401;
        return resp.status(INVALID_AUTH_STATUS).send({message: response.message});
    }
}