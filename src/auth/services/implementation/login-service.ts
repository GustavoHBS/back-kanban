import { inject } from "tsyringe";
import { Authentication } from "../authentication";
import { Login, LoginResponse } from "../login";

export class LoginService implements Login {
    private defaultUser = process.env.username;
    private defaultPassword = process.env.password;

    constructor(@inject("Authentication") private authentication: Authentication){}
    
    execute(user: string, password: string): LoginResponse {
        if(this.defaultUser === user && this.defaultPassword === password){
            return {
                validLogin: true,
                token: this.authentication.generateToken({user})
            };
        }
        return {
            validLogin: false,
            message: 'Invalid username or password!'
        };        
    }
}