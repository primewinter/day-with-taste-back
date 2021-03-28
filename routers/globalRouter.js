import express from "express";
import routes from "../routes";
import UserController from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.visit, UserController.visitHome);
globalRouter.post(routes.submit, UserController.submitAnswer);
globalRouter.post(routes.youtube, UserController.searchMusic);

export default globalRouter;
