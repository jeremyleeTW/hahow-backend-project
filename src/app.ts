import express from "express";
import {getHero, getHeroes} from "./controllers/hahowController";
import authMiddleware from "./middlewares/authMiddleware";
import {errorHandler} from "./middlewares/errorHandlers";
import loggerHandler from "./middlewares/loggerHandler";

const app = express();

app.set("etag", "strong"); // use strong etag
app.use(loggerHandler);

app.get("/heroes", authMiddleware, getHeroes);
app.get("/heroes/:heroId", authMiddleware, getHero);

app.use(errorHandler);

export default app;
