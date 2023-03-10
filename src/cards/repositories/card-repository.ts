import { Card } from '../card';

export interface CardRepository {
  getCards(): Promise<Card[]>;
  insertCard(card: Omit<Card, 'id'>): Promise<Card>;
  updateCard(card: Card): Promise<Card>;
  removeCard(id: string): Promise<void>;
  findCardById(id: string): Promise<Card | null>;
}
