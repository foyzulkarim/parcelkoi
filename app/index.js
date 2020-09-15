import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import winston from "winston";
import expressWinston from "express-winston";
import winstonDaily from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
//const ElasticsearchTransport = require('winston-elasticsearch');
import { ElasticsearchTransport } from "winston-elasticsearch";

const port = 3000;
const app = express();

app.use(express.json());

const processRequest = async (err, req, res, next) => {
    req.timestamp = new Date();
    req.correlationId = req.headers['x-correlation-id'];
    if (!req.correlationId) {
        req.correlationId = Date.now().toString()
    }
    return next(err, req, res, next);
}

//app.use(processRequest);

connectWithDb();

var infoTransport = new (winston.transports.DailyRotateFile)({
    filename: 'application-info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const esTransportOpts = {
    level: 'info',
    clientOpts: { node: 'http://localhost:9200/' },
    indexPrefix: 'log',
};

const esTransport = new (ElasticsearchTransport)(esTransportOpts);

var getMessages = function (req, res) {
    var msgObj = {
        correlationId: req.headers['x-correlation-id'].toString(),
        requestBody: JSON.stringify(req.body)
    };

    return JSON.stringify(msgObj);
}

const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        infoTransport,
        esTransport
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    msg: getMessages
    //msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    //msg: "{ 'correlationId':'{{req.headers['x-correlation-id']}}', 'error' : '{{err.message}}', 'request': '{{JSON.stringify(req.body)}}', 'timestamp': '{{req.timestamp}}'}",

});

app.use(logger);

configure(app);

var errorTransport = new (winston.transports.DailyRotateFile)({
    filename: 'application-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

var errorMongoTransport = new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta',
});

const errorLogger = expressWinston.errorLogger(
    {
        transports: [
            new winston.transports.Console(),
            errorTransport,
            errorMongoTransport
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true,
        msg: "{ 'correlationId':'{{req.headers['x-correlation-id']}}', 'error' : '{{err.message}}', 'request': '{{JSON.stringify(req.body)}}', 'timestamp': '{{req.timestamp}}'}",
        correlationId: "{{req.headers['x-correlation-id']}}"
    });

app.use(errorLogger);

app.use(handleErrors);

app.listen(port, () => {
    console.log("Listening to port " + port);
    console.log("express-winston demo listening on port %d in %s mode", port, app.settings.env);
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