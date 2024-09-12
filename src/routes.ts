import express from "express";
import { categoriesControllers } from "./controllers/categoriesController";

const router = express.Router();

router.get("/categories", categoriesControllers.index );

export default router;