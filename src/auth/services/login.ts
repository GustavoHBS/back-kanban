export interface LoginResponse {
  validLogin: boolean;
  message?: string;
  tokenData?: TokenData;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface Login {
  execute(user: string, password: string): LoginResponse;
}
