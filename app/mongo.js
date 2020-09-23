import mongoose from "mongoose";

export const mongoUri = "mongodb://localhost:27017/parcelkoi";
const options = {};

export const connectWithDb = (uri) => {
    if (!uri) uri = mongoUri;

    mongoose.connect(uri, options, (err, db) => {
        if (err) {
            //console.error(err);
            throw err;
        }
        //else log("database connection established");
    });
};