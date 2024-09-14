import express from "express";
import { categoriesControllers } from "./controllers/categoriesController";
import { coursesControllers } from "./controllers/coursesControllers";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";

const router = express.Router();

// User
router.post("/auth/register", authController.register);

// Category
router.get("/categories", categoriesControllers.index );
router.get("/categories/:id", categoriesControllers.show );

// Course
router.get("/courses/featured", coursesControllers.featured);
router.get("/courses/newest", coursesControllers.newest);
router.get("/courses/search", coursesControllers.search)
router.get("/courses/:id", coursesControllers.show);

// Episode
router.get("/episodes/stream", episodesController.strem);



export default router;