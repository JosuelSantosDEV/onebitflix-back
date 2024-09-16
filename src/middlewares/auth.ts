import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { IUserInstance } from "../models/User";

export interface IAuthenticatedRequest extends Request {
    user?: IUserInstance | null;
}

export const ensureAuth = (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader) return res.status(401).json({message: "not authorizate: not find token"});

    const token = authorizationHeader.replace(/Bearer /, "");

    jwtService.verifyToken(token, (err, decoded)=> {
        if(err || typeof decoded === "undefined") return res.status(401).json({message: "not authorizate: invalid token"});
        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user;
            next();
        });
    });
};