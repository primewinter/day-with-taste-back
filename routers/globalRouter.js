import express from "express";
import routes from "../routes";
import { home, result } from "../controllers/testController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.result, result);

export default globalRouter;
