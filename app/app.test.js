import request from 'supertest';
import app from './app';
// import userService from './services/userService';
import models from './models';
import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
const mongod = new MongoMemoryServer();
const userData = { username: 'TekLoon', createdAt: new Date() };

const mongoUri = 'mongodb://localhost:27017/parcelkoi';

describe('user controller test suite', () => {

    // let connection;
    // let db;

    beforeAll(async () => {
        console.log('before all');
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, opts, (err) => {
            if (err) console.error(err);
        });
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

    // test('should work', () => {
    //     console.log('my first test');
    // });


    test('create & save user successfully', async () => {

        const validUser = new models.User(userData);
        const savedUser = await validUser.save();
        console.log(savedUser);
        //Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.gender).toBe(userData.gender);
        expect(savedUser.dob).toBe(userData.dob);
        expect(savedUser.loginUsing).toBe(userData.loginUsing);
    });

    test('get all users should return list of users', async () => {
        console.log('get all users test');
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
    });

    // test('add user should return user id', async () => {
    //     const users = db.collection('users');
    //     const mockUser = { _id: 'some-user-id', username: 'John' };
    //     let response = await request(app).post('/users').send({ 'username': 'john' });
    //     expect(response.statusCode).toBe(201);
    // })
})

