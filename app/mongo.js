import mongoose from "mongoose";
import * as Constants from "./constants";

export const mongoUri = Constants.MongoDB_URI;
const options = {};

export const connectWithDb = (uri) => {
    if (!uri) uri = mongoUri;

    mongoose.connect(uri, options, (err, db) => {
        if (err) {
            //console.error(err);
            throw err;
        }
        else console.log("database connection established ", uri);
    });
};