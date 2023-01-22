export enum HttpMethod {
    GET = 'get',
    POST = 'post', 
    DEL = 'del',
    PUT= 'put'
}

export interface HttpServer {
    start(port: number);
    setRoute(method: HttpMethod, route: string, callback: Function);
}