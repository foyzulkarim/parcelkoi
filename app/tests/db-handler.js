'use strict';

// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

mongoose.connection.on('connected', function () {
    console.log(`STATE: `, mongoose.connection.readyState);
    console.log('connected');
    console.log('Mongoose default connection open to ');
});


/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    // const uri = await mongod.getConnectionString();
    const uri = `mongodb://127.0.0.1/avengers`
    console.log(`URI: ${uri}`);
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    console.log(collections);
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};