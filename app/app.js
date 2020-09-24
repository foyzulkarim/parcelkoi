import express from "express";
import configure from "./controllers";
import { connectWithDb, mongoUri } from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import { infoLogger, errorLogger } from "./logger";

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

const processRequest = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }

    res.set('x-correlation-id', correlationId);

    return next();
}

app.use(processRequest);

console.log('environment: ', process.env.environment);
if (process.env.environment != 'test') {
    connectWithDb();
}

app.use(infoLogger);

configure(app);

app.use(errorLogger);

app.use(handleErrors);

export default app;