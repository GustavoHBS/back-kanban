export interface Authentication {
    generateToken(data: Record<string, any>)
    validToken(token: string)
}