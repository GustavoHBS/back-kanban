import { LoginController } from 'src/auth/controllers';
import { CardsController } from 'src/cards/controllers';
import { Controller } from 'src/shared/interfaces/controller';
import { container, InjectionToken } from 'tsyringe';
import { HttpServer } from '../server/http-server';

export const route = (httpServer: HttpServer) => {
  const controllers: InjectionToken<Controller>[] = [
    LoginController,
    CardsController,
  ];
  controllers.forEach((controller) => {
    const controllerResolved = container.resolve(controller);
    controllerResolved.registryRoutes(httpServer);
  });
};
