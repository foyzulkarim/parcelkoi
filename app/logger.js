
import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";
import * as Constants from "./constants";

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

console.log(Constants.MongoDB_URI);

const mongoErrorTransport = new winston.transports.MongoDB({
    db: Constants.MongoDB_URI,
    metaKey: 'meta'
})

const elasticsearchOptions = {
    level: 'info',
    clientOpts: { node: 'http://localhost:9200' },
    indexPrefix: 'log-parcelkoi'
};

const esTransport = new (ElasticsearchTransport)(elasticsearchOptions);

const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };

    return JSON.stringify(obj);
}

export const infoLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileInfoTransport,
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: getMessage
});

export const errorLogger = expressWinston.errorLogger({
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

