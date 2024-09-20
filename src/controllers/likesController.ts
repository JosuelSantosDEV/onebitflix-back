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
    },
    // DELETE/likes/:id
    delete: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const courseId = req.params.id;

            await likeService.delete(userId, Number(courseId));
            res.status(201).json({message: "delete sucesfull"});
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            };
        };
    }
};