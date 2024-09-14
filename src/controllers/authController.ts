import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
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
    }
}