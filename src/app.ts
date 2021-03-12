import express from "express";
import {errorHandler} from "./middlewares/errorHandlers";
import loggerHandler from "./middlewares/loggerHandler";

const app = express();

app.set("etag", "strong"); // use strong etag
app.use(loggerHandler);

// TODO start from here

app.use(errorHandler);

export default app;
