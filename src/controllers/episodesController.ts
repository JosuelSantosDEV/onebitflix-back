import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { episodeService } from "../services/episodeService";
import { IAuthenticatedRequest } from "../middlewares/auth";

export const episodesController = {
    // GET/episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        try {
            const {videoUrl} = req.query;
            if(typeof videoUrl !== "string") throw new Error("The param videoUrl not string: videoUrl param must be of type string!");

            const range = req.headers.range; // bytes=0-1024

            episodeService.streamEpisodeToResponse(res, videoUrl, range);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        };

    },
    // GET/episodes/:id/watchTime
    getWatchTime: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const episodeId = req.params.id;

            const watchTime = await episodeService.getWatchTime(userId, Number(episodeId));
            return res.json(watchTime);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        };
    },
    // POST/episodes/:id/watchTime
    setWatchTime: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const episodeId = Number(req.params.id);
            const {seconds} = req.body;

            const watchTime = await episodeService.setWatchTime({
                seconds,
                userId,
                episodeId,
            });
            return res.json(watchTime);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        };
    }
}