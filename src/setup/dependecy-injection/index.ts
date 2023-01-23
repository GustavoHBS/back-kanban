import { LoginService } from '../../auth/services/implementation/login-service';
import { container, Lifecycle } from 'tsyringe';
import { LoginController } from '../../auth/controllers';

import { CardsController } from '../../cards/controllers';
import { ExpressServer } from '../server/implementation/express-server';
import { AuthMiddleware } from '../middlewares/implementation/auth-middleware';
import { JwtAuthentication } from '../../auth/services/implementation/jwt-authentication';
import { CardsServiceImpl } from '../../cards/services/implementation/cards-service';
import { CardRepositoryImpl } from '../../cards/repositories/implementation/card-repository';

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
