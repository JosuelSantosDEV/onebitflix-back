import express from "express";
import { categoriesControllers } from "./controllers/categoriesController";
import { coursesControllers } from "./controllers/coursesControllers";

const router = express.Router();

// Category
router.get("/categories", categoriesControllers.index );
router.get("/categories/:id", categoriesControllers.show );

// Course
router.get("/courses/:id", coursesControllers.show);


export default router;