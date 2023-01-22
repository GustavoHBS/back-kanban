import * as express from 'express'
import { LoginController } from '../../../auth/controllers';
import { inject, singleton } from 'tsyringe';
import { HttpMethod, HttpServer } from '../http-server';

@singleton()
export class ExpressServer implements HttpServer{
    private app: express.Express
    constructor() {
        this.app = express();
        this.app.use(express.json())

    }

    setRoute(method: HttpMethod, route: string, callback: Function) {
        this.app[method](route, callback);
    }

    addMiddleware(callback: any, path?: string) {
        if(path){
            this.app.use(path, callback);
        } else {
            this.app.use(callback);
        }
    }


    start(port: Number){
        this.app.listen(port, () => console.log(`SERVER STARTED IN PORT ${port}`))
    }
    
}