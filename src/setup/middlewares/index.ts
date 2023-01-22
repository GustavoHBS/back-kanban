import { HttpServer } from "../server/http-server";
import { container } from "tsyringe";
import { AuthMiddleware } from "./implementation/auth-middleware";

export const middlewares = (httpServer: HttpServer) => {
    const authMiddleware = container.resolve(AuthMiddleware)
    authMiddleware.add(httpServer);
}