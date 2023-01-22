import { LoginService } from "../../auth/services/implementation/login-service";
import { container, Lifecycle } from "tsyringe";
import { LoginRoutes } from "../../auth/controllers";
import { JwtAuthentication } from "../../auth/services/implementation/jwt-authentication";
import { CardsRoutes } from "../../cards/routes";
import { ExpressServer } from "../server/implementation/express-server";

container.register("HttpServer", ExpressServer, {
    lifecycle: Lifecycle.Singleton
});
container.register("LoginRout", {useClass: LoginRoutes}, {
    lifecycle: Lifecycle.Singleton
})
container.register("Login", {useClass: LoginService})
container.register("CardsRoutes", CardsRoutes);

container.register("Authentication", {useClass: JwtAuthentication});
