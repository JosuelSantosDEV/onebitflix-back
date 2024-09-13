import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesControllers = {
    // GET/categories  
    index: async (req: Request, res: Response) => {
        try {

            const [page, perPage] = getPaginationParams(req.query)

            const paginatedCategories = await categoryService.findAllPaginated(page, perPage);
 
            return res.json(paginatedCategories);

        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        };
    },
    // GET/categories/:id
    show: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;

            const category = await categoryService.findByIdWithCourses(id);
            return res.json(category)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            };
        }
    }
}