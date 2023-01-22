import { LoginService } from "../../auth/services/implementation/login-service";
import { container, Lifecycle } from "tsyringe";
import { LoginController } from "../../auth/controllers";
import { JwtAuthentication } from "../../auth/services/implementation/jwt-authentication";
import { CardsRoutes } from "../../cards/routes";
import { ExpressServer } from "../server/implementation/express-server";
import { AuthMiddleware } from "../middlewares/implementation/auth-middleware";

container.register("HttpServer", ExpressServer, {
    lifecycle: Lifecycle.Singleton
});
container.register("LoginController", {useClass: LoginController})
container.register("Login", {useClass: LoginService})
container.register("AuthMiddleware", {useClass: AuthMiddleware})

container.register("CardsRoutes", CardsRoutes);

container.register("Authentication", {useClass: JwtAuthentication});
