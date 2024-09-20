import { Response } from "express";
import { IAuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
    // GET/users/current
    show: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const currentUser = req.user!

            return res.json(currentUser);
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            };
        };
    },
    // GET/users/current/watching
    watching: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const {id} = req.user!

            const watching = await userService.getKeepWatchingList(id);
            return res.json(watching);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            };
        };
    }
};