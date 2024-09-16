import express from "express";
import { categoriesControllers } from "./controllers/categoriesController";
import { coursesControllers } from "./controllers/coursesControllers";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";

const router = express.Router();

// User
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Category
router.get("/categories",  ensureAuth,categoriesControllers.index );
router.get("/categories/:id",  ensureAuth,categoriesControllers.show );

// Course
router.get("/courses/featured",  ensureAuth,coursesControllers.featured);
router.get("/courses/newest", coursesControllers.newest);
router.get("/courses/search",  ensureAuth,coursesControllers.search)
router.get("/courses/:id",  ensureAuth,coursesControllers.show);

// Episode
router.get("/episodes/stream",  ensureAuthViaQuery,episodesController.strem);



export default router;