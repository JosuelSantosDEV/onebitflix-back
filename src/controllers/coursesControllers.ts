import { Request, Response } from "express"
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const coursesControllers = {
    // GET/courses/featured
    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await  courseService.getRandomFeaturedCourses();
            return res.status(200).json(featuredCourses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }
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
            }
        }
    },
    // GET/courses/:id
    show: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;

            const course = await courseService.findByIdWithEpisodes(id);
            return res.status(200).json(course);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }
    }
} 