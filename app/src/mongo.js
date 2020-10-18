import mongoose from "mongoose";

console.log('process.env.MONGODB_HOST: ', process.env.MONGODB_HOST);
let host = process.env.MONGODB_HOST || "localhost";
export const uri = `mongodb://${host}:27017/parcelkoi`;
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