import { Card } from '../card';

export interface CardsService {
  getCards(): Promise<Card[]>;
  insertCard(card: Omit<Card, 'id'>): Promise<Card>;
  updateCard(card: Partial<Card>): Promise<Card | never>;
}
