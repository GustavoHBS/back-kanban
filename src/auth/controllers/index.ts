import { Request, Response } from "express";
import { HttpMethod, HttpServer } from "../../setup/server/http-server";
import { inject, injectable } from "tsyringe";
import { Login } from "../services/login";

@injectable()
export class LoginRoutes {
    constructor(@inject("Login") private loginService: Login){
        console.log("OLA LOGIN")
    }

    registryRoutes(httpServer: HttpServer){
        httpServer.setRoute(HttpMethod.POST, '/login', this.login);
    }

    login = (request: Request, resp: Response) =>{
        const body = request.body;
        console.log("this.loginService", this)
        const response = this.loginService.execute(body.login, body.senha);
        if(response.validLogin){
            return resp.send({token: response.token});
        }
        const INVALID_AUTH_STATUS = 401;
        return resp.status(INVALID_AUTH_STATUS).send({message: response.message});
    }
}