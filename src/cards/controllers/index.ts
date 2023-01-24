import { HttpMethod, HttpServer } from '../../setup/server/http-server';
import { inject, injectable } from 'tsyringe';
import { Controller } from '../../shared/interfaces/controller';
import {
  Request,
  Response,
} from '../../setup/server/implementation/express-server';
import { CardsService } from '../services/cards-service';
import {
  createPayloadToDomain,
  updatePayloadToDomain,
} from '../mapper/card-mapper';
import { NotFoundError } from '../../shared/errors/not-found-error';

@injectable()
export class CardsController implements Controller {
  constructor(@inject('CardsService') private cardsService: CardsService) {}

  registryRoutes = (httpServer: HttpServer) => {
    httpServer.setRoute(HttpMethod.GET, '/cards', this.getCards);
    httpServer.setRoute(HttpMethod.POST, '/cards', this.insertCard);
    httpServer.setRoute(HttpMethod.PUT, '/cards/:id', this.updateCard);
  };

  private getCards = async (_req: Request, res: Response) => {
    const cards = await this.cardsService.getCards();
    return res.send(cards);
  };

  private insertCard = async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const card = createPayloadToDomain(body);
      const insertedCard = await this.cardsService.insertCard(card);
      return res.status(201).send(insertedCard);
    } catch (_err) {
      return res.status(400).send();
    }
  };

  private updateCard = async (req: Request, res: Response) => {
    const body = req.body;
    const { id } = req.params;
    try {
      if (!id || id !== body.id) {
        throw new Error();
      }
      const card = updatePayloadToDomain(body);
      const insertedCard = await this.cardsService.updateCard(card);
      return res.status(201).send(insertedCard);
    } catch (err: unknown) {
      if (err instanceof NotFoundError) {
        return res.status(404).send();
      }
      return res.status(400).send();
    }
  };
}
