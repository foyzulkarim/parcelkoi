import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { handleRequest, handleError } from "./middlewares/index";
import { errorLogger, infoLogger } from "./logger";
import dotenv from "dotenv";
dotenv.config();

const app = express();

console.log(process.env.ENVIRONMENT);

app.use(express.json());

app.use(handleRequest);

connectWithDb();

if (process.env.ENVIRONMENT != 'TEST')
    app.use(infoLogger);

configure(app);

if (process.env.ENVIRONMENT != 'TEST')
    app.use(errorLogger(uri));

app.use(handleError);

export default app;