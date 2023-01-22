import { Authentication } from "../../../auth/services/authentication";
import { inject, injectable } from "tsyringe";
import { HttpServer } from "../../server/http-server";
import { NextFunction, Request, Response } from "express";
import { Middleware } from "../middleware";

@injectable()
export class AuthMiddleware implements Middleware {
    constructor(@inject("Authentication") private authentication: Authentication){
    }

    add(httpServer: HttpServer){
        httpServer.addMiddleware(this.checkToken, "*")
    }
    

    private checkToken = async (req: Request, res: Response, next: NextFunction) =>{
        if(req.path.includes("login")){
            return next();
        }
        const token = req.headers.authorization;
        const isValid = await this.authentication.validToken(token)
        if(isValid){
            return next();
        }
        return res.status(401).send();
    }
    
}