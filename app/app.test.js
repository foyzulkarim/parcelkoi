//import request from 'supertest';
//import app from './app';
// import userService from './services/userService';
import models from './models';
import mongoose from "mongoose";
import MongoMemoryServer from 'mongodb-memory-server';
//export const uri = "mongodb://localhost:27017/parcelkoitest";
//jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
let mongoServer;
const userData = { username: 'TekLoon' + new Date(), createdAt: new Date() };
const opts = { useMongoClient: true };

describe('user controller test suite', () => {

    beforeAll(async () => {
        console.log('before all');
        mongoServer = new MongoMemoryServer();
        console.log(mongoServer.getConnectionString);
        try {
            mongoServer.getConnectionString().then(connectionString => {
                console.log(connectionString);
            })

            const mongoUri = await mongoServer.getConnectionString();
            console.log(mongoUri);
            await mongoose.connect(mongoUri, opts, (err) => {
                if (err) console.error(err);
            });
        } catch (error) {
            console.error(error);
        }

    });

    afterAll(async () => {
        console.log('after all');
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        console.log('before each');
    });

    afterEach(async () => {
        console.log('after each');
    })

    test('should work', async () => {
        const User = models.User;
        const count = await User.count();
        expect(count).toEqual(0);
    });


    // test('create & save user successfully', async () => {

    //     const validUser = new models.User(userData);
    //     const savedUser = await validUser.save();
    //     console.log(savedUser);
    //     //Object Id should be defined when successfully saved to MongoDB.
    //     expect(savedUser._id).toBeDefined();
    // }, 5000);

    // test('get all users should return list of users', async () => {
    //     console.log('get all users test');
    //     let response = await request(app).get('/users');
    //     expect(response.statusCode).toBe(200);
    // }, 10000);

    // test('add user should return user id', async () => {
    //     const users = db.collection('users');
    //     const mockUser = { _id: 'some-user-id', username: 'John' };
    //     let response = await request(app).post('/users').send({ 'username': 'john' });
    //     expect(response.statusCode).toBe(201);
    // })
})

