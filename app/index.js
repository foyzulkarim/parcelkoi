import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import winston from "winston";
import expressWinston from "express-winston";
import winstonDaily from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";

const port = 3000;
const app = express();

app.use(express.json());

const processRequest = async (req, res, next) => {
    var correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        req.headers['x-correlation-id'] = Date.now().toString();
        correlationId = req.headers['x-correlation-id'];
    }

    res.set('x-correlation-id', correlationId);

    return next();
}

app.use(processRequest);

connectWithDb();

var fileTransport = new (winston.transports.DailyRotateFile)({
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

var fileErrorTransport = new (winston.transports.DailyRotateFile)({
    filename: 'application-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

var mongoErrorTransport = new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta',
});

var getLogMessage = function (req, res) {
    var msgObj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };

    return JSON.stringify(msgObj);
}

const infoLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileTransport,
        esTransport
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    msg: getLogMessage
});

const errorLogger = expressWinston.errorLogger(
    {
        transports: [
            new winston.transports.Console(),
            fileErrorTransport,
            mongoErrorTransport,
            esTransport
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true,
        msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error" : "{{err.message}}" }',
        correlationId: "{{req.headers['x-correlation-id']}}"
    });


app.use(infoLogger);

configure(app);

app.use(errorLogger);

app.use(handleErrors);

app.listen(port, () => {
    console.log("Listening to port " + port);
    console.log("express-winston demo listening on port %d in %s mode", port, app.settings.env);
});