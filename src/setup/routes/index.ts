import { HttpServer } from '../server/http-server';
import { container, InjectionToken } from 'tsyringe';
import { LoginController } from '../../auth/controllers';
import { Controller } from '../../shared/interfaces/controller';
import { CardsController } from '../../cards/controllers';

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
