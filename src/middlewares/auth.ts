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

    jwtService.verifyToken(token, async (err, decoded)=> {
        if(err || typeof decoded === "undefined") return res.status(401).json({message: "not authorizate: invalid token"});
        const user = await userService.findByEmail((decoded as JwtPayload).email);
        req.user = user;
        next();
    });
};

export function ensureAuthViaQuery(req:IAuthenticatedRequest , res: Response, next: NextFunction){
    const {token} = req.query;

    if(!token) return res.status(401).json({message: "not authorizate: not find token"});
    if(typeof token !== "string") return res.status(400).json({message: "not authorizate: token type must be string"});

    jwtService.verifyToken(token, async (err, decoded)=>{
        if(err || typeof decoded === "undefined") return res.status(401).json({message: "not authorizate: invalid token"});

        const user = await userService.findByEmail((decoded as JwtPayload).email);
        req.user = user;
        next();
    })
}