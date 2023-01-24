import { LoginController } from 'src/auth/controllers';
import { JwtAuthentication } from 'src/auth/services/implementation/jwt-authentication';
import { LoginService } from 'src/auth/services/implementation/login-service';
import { CardsController } from 'src/cards/controllers';
import { CardRepositoryImpl } from 'src/cards/repositories/implementation/card-repository';
import { CardsServiceImpl } from 'src/cards/services/implementation/cards-service';
import { container, Lifecycle } from 'tsyringe';
import { AuthMiddleware } from '../middlewares/implementation/auth-middleware';
import { ExpressServer } from '../server/implementation/express-server';

container.register('HttpServer', ExpressServer, {
  lifecycle: Lifecycle.Singleton,
});
container.register('LoginController', { useClass: LoginController });
container.register('Login', { useClass: LoginService });
container.register('AuthMiddleware', { useClass: AuthMiddleware });

container.register('CardsController', { useClass: CardsController });
container.register('CardsService', { useClass: CardsServiceImpl });
container.register('CardRepository', { useClass: CardRepositoryImpl });

container.register('Authentication', { useClass: JwtAuthentication });
