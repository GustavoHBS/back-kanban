import { inject, injectable } from 'tsyringe';
import { Middleware } from '../middleware';
import {
  Request,
  Response,
  Next,
} from 'src/setup/server/implementation/express-server';
import { Card } from 'src/cards/card';
import { CardsService } from 'src/cards/services/cards-service';
import { HttpServer } from 'src/setup/server/http-server';
import { HTTP_STATUS } from 'src/shared/enums/http-status';

@injectable()
export class LogMiddleware implements Middleware {
  constructor(@inject('CardsService') private cardService: CardsService) {}

  add = (httpServer: HttpServer) => {
    httpServer.addMiddleware(this.logUpdateAndDelete, '*');
  };

  private logUpdateAndDelete = async (
    req: Request,
    res: Response,
    next: Next,
  ) => {
    if (['DELETE', 'PUT'].includes(req.method)) {
      const id = this.getIdFromPathParams(req.params);
      if (id) {
        const card = await this.cardService.findCardById(id);
        if (card) {
          res.on('finish', () => {
            if (res.statusCode === HTTP_STATUS.OK) {
              const action = req.method === 'DELETE' ? 'Removido' : 'Alterado';
              this.logChanged(card, action);
            }
          });
        }
      }
    }
    return next();
  };

  private logChanged = (card: Card, action: string) => {
    const date = new Date();
    console.log(
      `${date.toLocaleString()} - Card ${card.id} - ${card.titulo} - ${action}`,
    );
  };

  private getIdFromPathParams = (params: Record<string, string>) => {
    const path = Object.values(params)[0];
    return path.match(/[\w-]+[\/]{0,1}$/)?.[0];
  };
}
