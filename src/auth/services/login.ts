export interface LoginResponse {
    validLogin: boolean,
    message?: string;
    token?:  string;
}

export interface Login {
    execute(user: string, password: string): LoginResponse
}