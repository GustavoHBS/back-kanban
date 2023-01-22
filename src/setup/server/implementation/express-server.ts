import express, {Express} from 'express'
import { singleton } from 'tsyringe';
import { HttpMethod, HttpServer } from '../http-server';

@singleton()
export class ExpressServer implements HttpServer{
    private app: Express
    constructor() {
        this.app = express();
    }
    setRoute(method: HttpMethod, route: string, callback: Function) {
        this.app[method](route, callback);
    }
    start(port: Number){
        this.app.listen(port)
    }
    
}