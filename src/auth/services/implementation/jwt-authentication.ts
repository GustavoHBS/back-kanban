import jwt from "jsonwebtoken";
import { Authentication } from "../authentication";

export class JwtAuthentication implements Authentication {
    private secret = process.env.token_secret;

    generateToken(data: Record<string, any>) {
        return jwt.sign(data, this.secret);
    }
    
    validToken(token: string) {
        return new Promise((resolve) => {
            jwt.verify(token, this.secret, function(err){
                resolve(!err);
            });
        })
    }

}