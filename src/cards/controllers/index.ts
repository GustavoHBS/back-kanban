import { HttpServer, HttpMethod } from 'src/setup/server/http-server';
import {
  Request,
  Response,
} from 'src/setup/server/implementation/express-server';
import { HTTP_STATUS } from 'src/shared/enums/http-status';
import { BadRequestError } from 'src/shared/errors/bad-request-error';
import { NotFoundError } from 'src/shared/errors/not-found-error';
import { Controller } from 'src/shared/interfaces/controller';
import { inject, injectable } from 'tsyringe';
import { payloadToDomain } from '../mapper/card-mapper';
import { CardsService } from '../services/cards-service';

@injectable()
export class CardsController implements Controller {
  constructor(@inject('CardsService') private cardsService: CardsService) {}

  registryRoutes = (httpServer: HttpServer) => {
    httpServer.setRoute(HttpMethod.GET, '/cards', this.getCards);
    httpServer.setRoute(HttpMethod.POST, '/cards', this.insertCard);
    httpServer.setRoute(HttpMethod.PUT, '/cards/:id', this.updateCard);
    httpServer.setRoute(HttpMethod.DEL, '/cards/:id', this.deleteCard);
  };

  private getCards = async (_req: Request, res: Response) => {
    const cards = await this.cardsService.getCards();
    return res.send(cards);
  };

  private insertCard = async (req: Request, res: Response) => {
    try {
      const card = this.getCardOrThrowBadRequest(req.body);
      const insertedCard = await this.cardsService.insertCard(card);
      return res.status(HTTP_STATUS.CREATED).send(insertedCard);
    } catch (err) {
      if (err instanceof BadRequestError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send();
      }
      return res.status(HTTP_STATUS.SERVER_ERROR).send();
    }
  };

  private updateCard = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const { id } = req.params;
      if (!id || id !== body.id) {
        throw new Error();
      }
      const card = this.getCardOrThrowBadRequest(body);
      const insertedCard = await this.cardsService.updateCard(card);
      return res.status(HTTP_STATUS.OK).send(insertedCard);
    } catch (err: unknown) {
      if (err instanceof NotFoundError) {
        return res.status(HTTP_STATUS.NOT_FOUND).send();
      }
      if (err instanceof BadRequestError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send();
      }
      return res.status(HTTP_STATUS.BAD_REQUEST).send();
    }
  };

  private deleteCard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new NotFoundError();
      }
      const cards = await this.cardsService.deleteCard(id);
      return res.status(HTTP_STATUS.OK).send(cards);
    } catch (err: unknown) {
      if (err instanceof NotFoundError) {
        return res.status(HTTP_STATUS.NOT_FOUND).send();
      }
      return res.status(HTTP_STATUS.SERVER_ERROR).send();
    }
  };

  private getCardOrThrowBadRequest = (body: unknown) => {
    const parsed = payloadToDomain.safeParse(body);
    if (parsed.success) {
      return parsed.data;
    }
    throw new BadRequestError();
  };
}
