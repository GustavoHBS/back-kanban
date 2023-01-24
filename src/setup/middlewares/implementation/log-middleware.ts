import { Authentication } from '../../../auth/services/authentication';
import { inject, injectable } from 'tsyringe';
import { HttpServer } from '../../server/http-server';

import { Middleware } from '../middleware';
import {
  Request,
  Response,
  Next,
} from '../../../setup/server/implementation/express-server';
import { CardsService } from '../../../cards/services/cards-service';

@injectable()
export class LogMiddleware implements Middleware {
  constructor(@inject('CardsService') private cardService: CardsService) {}

  add(httpServer: HttpServer) {
    httpServer.addMiddleware(this.logUpdateAndDelete, '*');
  }

  private logUpdateAndDelete = async (
    req: Request,
    res: Response,
    next: Next,
  ) => {
    if (['DELETE', 'PUT'].includes(req.method)) {
      const path = Object.values(req.params)[0];
      const id = path.match(/[\w-]+[\/]{0,1}$/)?.[0];
      if (id) {
        const card = await this.cardService.findCardById(id);
        if (card) {
          res.on('finish', () => {
            if (res.statusCode === 200) {
              const date = new Date();
              const action = req.method === 'DELETE' ? 'Removido' : 'Alterado';
              console.log(
                `${date.toLocaleString()} - Card ${id} - ${
                  card.titulo
                } - ${action}`,
              );
            }
          });
        }
      }
    }
    return next();
  };
}
