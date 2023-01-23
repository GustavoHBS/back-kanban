import { Card } from '../card';

export interface CardRepository {
  getCards(): Promise<Card[]>;
  insertCard(card: Omit<Card, 'id'>): Promise<Card>;
}
