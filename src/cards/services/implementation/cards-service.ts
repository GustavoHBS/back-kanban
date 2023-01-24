import { Card } from '../../../cards/card';
import { CardRepository } from '../../../cards/repositories/card-repository';
import { inject, injectable } from 'tsyringe';
import { CardsService } from '../cards-service';
import { NotFoundError } from '../../../shared/errors/not-found-error';

@injectable()
export class CardsServiceImpl implements CardsService {
  constructor(
    @inject('CardRepository') private cardRepository: CardRepository,
  ) {}
  updateCard(card: Card): Promise<Card | never> {
    return this.cardRepository.updateCard(card).catch((err) => {
      throw new NotFoundError();
    });
  }
  insertCard(card: Omit<Card, 'id'>): Promise<Card> {
    return this.cardRepository.insertCard(card);
  }
  getCards(): Promise<Card[]> {
    return this.cardRepository.getCards();
  }
}
