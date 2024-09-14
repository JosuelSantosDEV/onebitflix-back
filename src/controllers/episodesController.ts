import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { episodeService } from "../services/episodeService";

export const episodesController = {
    // GET/episodes/stream?videoUrl=
    strem: async (req: Request, res: Response) => {
        try {
            const {videoUrl} = req.query;
            if(typeof videoUrl !== "string") throw new Error("The param videoUrl not string: videoUrl param must be of type string!");

            const range = req.headers.range; // bytes=0-1024

            episodeService.streamEpisodeToResponse(res, videoUrl, range);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }

    }
}