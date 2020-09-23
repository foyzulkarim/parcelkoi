//import { MongoMemoryServer } from 'mongodb-memory-server';
const MongoMemoryServer = require('mongodb-memory-server');

async function run() {
    console.log(await new MongoMemoryServer().getConnectionString());
}

run();