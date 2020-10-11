import mongoose from "mongoose";

export const mongodb_uri = () => {
    let host = process.env.MONGODB_HOST || "localhost";
    return `mongodb://${host}:27017/parcelkoi`;
}

// export const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/parcelkoi";
const options = {};


const log = (msg) => console.log(msg);

export const connectWithDb = () => {
    mongoose.connect(mongodb_uri(), options, (err, db) => {
        if (err) {
            console.error(err);
        }

        else log("database connection established");
    });
};