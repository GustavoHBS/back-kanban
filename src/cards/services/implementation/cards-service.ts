import { Card } from 'src/cards/card';
import { CardRepository } from 'src/cards/repositories/card-repository';
import { NotFoundError } from 'src/shared/errors/not-found-error';
import { inject, injectable } from 'tsyringe';
import { CardsService } from '../cards-service';

@injectable()
export class CardsServiceImpl implements CardsService {
  constructor(
    @inject('CardRepository') private cardRepository: CardRepository,
  ) {}
  findCardById(id: string): Promise<Card | null> {
    return this.cardRepository.findCardById(id);
  }
  async deleteCard(id: string): Promise<Card[] | never> {
    await this.cardRepository.removeCard(id).catch(() => {
      throw new NotFoundError();
    });
    return this.getCards();
  }
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
