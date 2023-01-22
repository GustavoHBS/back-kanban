import { LoginRoutes } from "src/auth/routes";
import { JwtAuthentication } from "src/auth/services/implementation/jwt-authentication";
import { CardsRoutes } from "src/cards/routes";
import { container, Lifecycle } from "tsyringe";
import { ExpressServer } from "../server/implementation/express-server";

container.register("HttpServer", ExpressServer, {
    lifecycle: Lifecycle.Singleton
});

container.register("CardsRoutes", CardsRoutes);
container.register("LoginRoutes", LoginRoutes);
container.register("Authentication", JwtAuthentication);