import { PrismaClient } from '@prisma/client';
import { Card } from 'src/cards/card';
import { CardRepository } from '../card-repository';

export class CardRepositoryImpl implements CardRepository {
  private database: PrismaClient;
  constructor() {
    this.database = new PrismaClient();
  }

  async getCards(): Promise<Card[]> {
    return this.database.cards.findMany();
  }

  async insertCard(card: Omit<Card, 'id'>): Promise<any> {
    return this.database.cards.create({
      data: card,
    });
  }
}
