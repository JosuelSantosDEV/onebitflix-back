import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likeController = {
    // POST/likes
    save: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const {courseId} = req.body;

            const like = await likeService.create(userId, courseId);
            res.status(201).json(like);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            };
        }
    }
};