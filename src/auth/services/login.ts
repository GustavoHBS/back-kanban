export interface LoginResponse {
    validLogin: boolean,
    message?: string;
    tokenData?:  {
        token: string;
        expiresIn: number;
    };
}

export interface Login {
    execute(user: string, password: string): LoginResponse
}