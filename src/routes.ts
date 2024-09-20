import express from "express";
import { categoriesControllers } from "./controllers/categoriesController";
import { coursesControllers } from "./controllers/coursesControllers";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
import { favoritesController } from "./controllers/favoritesController";
import { likeController } from "./controllers/likesController";
import { usersController } from "./controllers/usersController";

const router = express.Router();

// Auth
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Category
router.get("/categories",  ensureAuth,categoriesControllers.index );
router.get("/categories/:id",  ensureAuth,categoriesControllers.show );

// Course
router.get("/courses/featured",  ensureAuth,coursesControllers.featured);
router.get("/courses/newest", coursesControllers.newest);
router.get("/courses/popular", ensureAuth, coursesControllers.popular);
router.get("/courses/search",  ensureAuth,coursesControllers.search)
router.get("/courses/:id",  ensureAuth,coursesControllers.show);

// Episode
router.get("/episodes/stream",  ensureAuthViaQuery,episodesController.stream);
router.get("/episodes/:id/watchTime", ensureAuth,episodesController.getWatchTime);
router.post("/episodes/:id/watchTime", ensureAuth,episodesController.setWatchTime);

// Favorite
router.get("/favorites",ensureAuth, favoritesController.index);
router.post("/favorites",ensureAuth, favoritesController.save);
router.delete("/favorites/:id", ensureAuth, favoritesController.delete);

// like
router.post("/likes", ensureAuth, likeController.save);
router.delete("/likes/:id", ensureAuth, likeController.delete);

// User
router.get("/users/current", ensureAuth, usersController.show);
router.put("/users/current", ensureAuth, usersController.update);
router.put("/users/current/password", ensureAuth, usersController.updatePassword);
router.get("/users/current/watching", ensureAuth, usersController.watching);



export default router;