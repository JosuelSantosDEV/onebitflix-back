import { Response } from "express";
import fs from "fs";
import path from "path";
import { IWatchTime, WatchTime } from "../models/WatchTime";

export const episodeService = {
    streamEpisodeToResponse: async (res: Response, videoUrl: string, range: string | undefined) => {
        
        const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl);
        const fileStart = fs.statSync(filePath);

            
        if(range){
            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1]? parseInt(parts[1], 10): fileStart.size - 1;

            const chunkSize = (end - start) + 1;

            const file = fs.createReadStream(filePath, {start, end });

            const head = {
                "Content-Range": `bytes ${start}-${end}/${fileStart.size}`,
                "Accept-Ranges": `bytes`,
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4"
            };

            res.writeHead(206, head);

            file.pipe(res);

            }else {
                const head = {
                    "Content-Length": fileStart.size,
                    "Content-Type": "video/mp4"
                };

                res.writeHead(200, head);

                fs.createReadStream(filePath).pipe(res);
            }
    },
    getWatchTime: async (userId: number, episodeId: number) => {
        const watchTime = await WatchTime.findOne({
            where: {
                userId,
                episodeId
            },
            attributes: ["seconds"]
        });
        return watchTime;
    },
    setWatchTime: async ( {seconds, userId, episodeId} : IWatchTime) => {
        const watchTimeAlreadyExists = await WatchTime.findOne({
            where: {
                userId,
                episodeId
            }
        });
        if(watchTimeAlreadyExists){
            console.log("Existe!!!");
            watchTimeAlreadyExists.seconds = seconds;
            await watchTimeAlreadyExists.save();
            return watchTimeAlreadyExists;
        } else {
            console.log("Não existe!!!");
            const watchTime = await WatchTime.create({
                userId,
                episodeId,
                seconds
            });
            return watchTime;
        }
    }
};