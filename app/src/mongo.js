import mongoose from "mongoose";

const HOST = process.env.MONGODB_HOST || "localhost";
console.log('process.env.MONGODB_HOST - ', HOST);

export const uri = `mongodb://${HOST}:27017/parcelkoi`;
const options = {};


const log = (msg) => console.log(msg);

export const connectWithDb = () => {
    mongoose.connect(uri, options, (err, db) => {
        if (err) {
            console.error(err);
        }

        else log("database connection established");
    });
};