export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  DEL = 'del',
  PUT = 'put',
}

export interface HttpServer {
  start(port: number): void;
  setRoute(method: HttpMethod, route: string, callback: Function): void;
  addMiddleware(callback: unknown, path?: unknown): void;
}
