import { Card } from '../card';

export interface CardsService {
  getCards(): Promise<Card[]>;
  insertCard(card: Omit<Card, 'id'>): Promise<Card>;
  updateCard(card: Partial<Card>): Promise<Card | never>;
  deleteCard(id: string): Promise<Card[] | never>;
  findCardById(id: string): Promise<Card | null>;
}
