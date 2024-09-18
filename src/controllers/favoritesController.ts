import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const favoritesController = {
    // GET/favorites
    index: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id;

            const favorites = await favoriteService.findByUserId(userId);
            return res.status(201).json(favorites);

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            };
        };
    },
    // POST/favorites
    save: async (req: IAuthenticatedRequest, res: Response) => {
        
        try {
            const userId = req.user!.id;
            const { courseId } = req.body;

            const favorite = await favoriteService.create(userId, courseId);
            return res.status(201).json(favorite);

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            };
        };
    },
    //DELETE/favorites/:id
    delete: async (req: IAuthenticatedRequest, res: Response) => {
        
        try {
            const userId = req.user!.id;
            const courseId  = req.params.id;

            await favoriteService.delete(userId, Number(courseId));

            return res.status(204).send();

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            };
        };
    },
};