import express from "express";
import { categoriesControllers } from "./controllers/categoriesController";

const router = express.Router();

router.get("/categories", categoriesControllers.index );
router.get("/categories/:id", categoriesControllers.show );


export default router;