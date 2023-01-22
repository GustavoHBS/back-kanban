import * as dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata";
import { container, inject } from "tsyringe";
import { route } from './auth/routes';
import './setup/dependecy-injection'
import { HttpServer } from "./setup/server/http-server";


/* (async () =>  {

})(); */

class Main {
    constructor(@inject("HttpServer") httpServer: HttpServer){
        route(httpServer);
        httpServer.start(3000);
    }
}

new Main(container.resolve("HttpServer"));