import { Card } from '../../../cards/card';
import { CardRepository } from '../../../cards/repositories/card-repository';
import { inject, injectable } from 'tsyringe';
import { CardsService } from '../cards-service';

@injectable()
export class CardsServiceImpl implements CardsService {
  constructor(
    @inject('CardRepository') private cardRepository: CardRepository,
  ) {}
  insertCard(card: Omit<Card, 'id'>): Promise<Card> {
    return this.cardRepository.insertCard(card);
  }
  getCards(): Promise<Card[]> {
    return this.cardRepository.getCards();
  }
}
