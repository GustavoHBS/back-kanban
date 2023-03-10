import { PrismaClient } from '@prisma/client';
import { Card } from 'src/cards/card';
import { CardRepository } from '../card-repository';

export class CardRepositoryImpl implements CardRepository {
  private database: PrismaClient;
  constructor() {
    this.database = new PrismaClient();
  }
  findCardById(id: string): Promise<Card | null> {
    return this.database.cards.findUnique({
      where: {
        id,
      },
    });
  }
  async removeCard(id: string): Promise<void> {
    await this.database.cards.delete({
      where: { id },
    });
  }
  updateCard(card: Card): Promise<Card> {
    const { id, conteudo, lista, titulo } = card;
    return this.database.cards.update({
      data: { conteudo, lista, titulo },
      where: {
        id,
      },
    });
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
