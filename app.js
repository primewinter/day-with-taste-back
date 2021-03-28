import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes.home, globalRouter);

export default app;
