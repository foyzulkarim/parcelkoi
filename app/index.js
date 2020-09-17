import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";

const port = 3000;
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

connectWithDb();

const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };

    return JSON.stringify(obj);
}

const fileInfoTransport = new (winston.transports.DailyRotateFile)(
    {
        filename: 'log-info-%DATE%.log',
        datePattern: 'yyyy-MM-DD-HH'
    }
);

const fileErrorTransport = new (winston.transports.DailyRotateFile)(
    {
        filename: 'log-error-%DATE%.log',
        datePattern: 'yyyy-MM-DD-HH'
    }
);

const mongoErrorTransport = new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta'
})

const elasticsearchOptions = {
    level: 'info',
    clientOpts: { node: 'http://localhost:9200' },
    indexPrefix: 'log-parcelkoi'
};

const esTransport = new (ElasticsearchTransport)(elasticsearchOptions);

const infoLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileInfoTransport,
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: getMessage
});

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        fileErrorTransport,
        mongoErrorTransport,
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }'
});

app.use(infoLogger);

configure(app);

app.use(errorLogger);

app.use(handleErrors);

app.listen(port, () => {
    console.log("Listening to port " + port);
});

/*
1. up and running the express server
2. configure the express server
3. handle the routes of the server

- use directory import
- use async awaiimport { handleErrors } from './middlewares/handleErrors';
t function

- 3 layer architecture
    UserController = controller layer : process the http requests
    UserService = service layer : process the object and send to data layer
    Mongoose wrapper = data layer : process the data and get/set it to database

*/