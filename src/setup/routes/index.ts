import { HttpServer } from "../server/http-server";
import { container } from "tsyringe";
import { LoginController } from "../../auth/controllers";

export const route = (httpServer: HttpServer) => {
    const loginRoutes = container.resolve(LoginController)
    loginRoutes.registryRoutes(httpServer);
}