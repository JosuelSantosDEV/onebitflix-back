import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const authController = {
    // POST/auth/register
    register: async (req: Request, res: Response) => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                phone,
                birth,
            } = req.body;
            // Verificação caso o usuário já exista
            const userAlreadyExists =  await userService.findByEmail(email);
            if(userAlreadyExists) throw new Error("The user already exists");

            const user =  await userService.create({
                firstName,
                lastName,
                password,
                email,
                birth,
                phone,
                role: "user"
            });

            return res.status(201).json(user);
            
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        }
    },
    // POST/auth/login
    login: async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;

            const user = await userService.findByEmail(email);

            if(!user) return res.status(404).json({message: "E-mail not find"}); 

            user.checkPassword(password, (err, isSame) => {
                if(err) return res.status(400).json({message: err.message});
                if(!isSame) return res.status(401).json({message: "incorrect password"});

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
                const token = jwtService.signToken(payload, '7d');

                return res.json({authentication: true, ...payload, token});
            });

        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        }
    } 
}