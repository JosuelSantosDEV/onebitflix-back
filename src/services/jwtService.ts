import jwt from "jsonwebtoken";

const secret = "key-of-jwt";

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload,secret, {
            expiresIn: expiration
        });
    } 
};