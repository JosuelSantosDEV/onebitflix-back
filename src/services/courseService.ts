import { Op } from "sequelize";
import { Course } from "../models";

export const courseService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseEpisodes = await Course.findByPk(id, {
            attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
            include: {
                association: "episodes",
                attributes: ["id","name", "synopsis","order",["video_url", "videoUrl"], ["seconds_long","secondsLong"]],
                order: [["order", "ASC"]],
                separate: true
            }
        });
        return courseEpisodes;
    },
    getRandomFeaturedCourses: async () => {
        const featuredCourses = await Course.findAll({
            where: {
                featured: true
            },
            attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]]
        });
        const randomFeaturedCourses = featuredCourses.sort(()=> 0.5 - Math.random());

        return randomFeaturedCourses.slice(0,3);
    },
    getTopTenNewest: async () => {
        const courses = await Course.findAll({
            limit: 10,
            order: [["created_at", "DESC"]]
        });

        return courses;
    },
    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage
        const {count, rows} = await Course.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%` // assim o sequelize irá procurar por qualquer incidência do name seja no inicio ou no fim
                }
            },
            attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
            limit: perPage,
            offset: offset
        });
        return {
            courses: rows,
            page,
            perPage,
            total: count
        };
    }
};