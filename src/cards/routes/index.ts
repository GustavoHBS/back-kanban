import { Request, Response } from "express";
import { HttpMethod, HttpServer } from "../../setup/server/http-server";
import { inject } from "tsyringe";

export class CardsRoutes {
    constructor(@inject("HttpServer") httpServer: HttpServer){
        httpServer.setRoute(HttpMethod.GET, '/cards/', this.getCards);
    }

    getCards(request: Request, Response: Response){

    }
}