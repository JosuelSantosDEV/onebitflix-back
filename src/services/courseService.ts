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
    getTopTenByLikes: async () => {
        const result = await Course.sequelize?.query(
            `SELECT
                courses.id,
                courses.name,
                courses.synopsis,
                courses.thumbnail_url AS thumbnailUrl,
                COUNT(users.id) AS likes
            FROM courses
                LEFT OUTER JOIN likes
                    ON courses.id = likes.course_id
                    INNER JOIN users
                        ON users.id = likes.user_id
            GROUP BY courses.id
            ORDER BY likes DESC
            LIMIT 10;
            `
        );
        if(result){
            const [topTen, metadata] = result;
            return topTen;
        }
        return null;
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