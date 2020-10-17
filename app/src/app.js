import express from "express";
import configure from "./controllers";
import { handleRequest, handleError } from "./middlewares/index";
import { infoLogger } from "./logger";
import dotenv from "dotenv";

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();

app.use(express.json());

app.use(handleRequest);

if (process.env.ENVIRONMENT != 'TEST')
    app.use(infoLogger());

configure(app);

//console.log(app);

app.use(handleError);

//let router = express.Router();
// const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);

export default app;