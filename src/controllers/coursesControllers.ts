import { Request, Response } from "express"
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { IAuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

export const coursesControllers = {
    // GET/courses/featured
    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await  courseService.getRandomFeaturedCourses();
            return res.status(200).json(featuredCourses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        };
    },
    // GET/courses/newest
    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await  courseService.getTopTenNewest();
            return res.status(200).json(newestCourses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }
    },
    // GET/courses/popular
    popular: async (req: Request, res: Response) => {
        try {
            const topTen = await  courseService.getTopTenByLikes();
            return res.status(200).json(topTen);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }
    },
    // GET/courses/search?name=
    search: async (req: Request, res: Response) => {
        try {
            const {name} = req.query;
            const [page, perPage] = getPaginationParams(req.query)

            // Verificação necessária para o tratamento do tipo da constante name
            if( typeof name !== "string") throw new Error("Query param not is string: name param must be of type string");

            const courses = await courseService.findByName(name, page, perPage);
            return res.status(200).json(courses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        };
    },
    // GET/courses/:id
    show: async (req: IAuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id
            const courseId = req.params.id;

            const course = await courseService.findByIdWithEpisodes(courseId);

            if(!course){
                return res.status(404).json({message: "course not find"});
            };
            const liked = await likeService.isLiked(userId, Number(courseId));
            const favorited = await favoriteService.isFavorited(userId, Number(courseId));

            return res.json({...course.get(), liked, favorited});
            
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        };
    }
} 