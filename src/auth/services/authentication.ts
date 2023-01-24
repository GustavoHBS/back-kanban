import { TokenData } from './login';

export interface Authentication {
  generateToken(data: Record<string, any>): TokenData;
  validToken(token: string): Promise<boolean>;
}
