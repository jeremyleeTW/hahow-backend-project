import express from "express";
import {getHeroes} from "./controllers/hahowController";
import {errorHandler} from "./middlewares/errorHandlers";
import loggerHandler from "./middlewares/loggerHandler";

const app = express();

app.set("etag", "strong"); // use strong etag
app.use(loggerHandler);

// TODO start from here
app.get("/heroes", getHeroes);

app.use(errorHandler);

export default app;
