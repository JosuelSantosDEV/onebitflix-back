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
    }
};