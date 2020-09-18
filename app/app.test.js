import mongoose from "mongoose";
import request from 'supertest';
import app from './app';
//const app = require('./app.js');

const uri = "mongodb://localhost:27017/parcelkoi";

let server;
beforeAll(async (done) => {
    await mongoose.connect(uri);
    // server = app.listen(4000, () => {
    //     global.agent = request.agent(server);
    //     done();
    // });
    done();
});

afterAll(async () => {
    // await server.close();
    // await mongoose.disconnect();
});

afterEach(async (done) => {
    done();
});

describe('user controller test', () => {

    test('my first test', async (done) => {
        console.log('hello world');
        done();
    });

    test('get users test', async (done) => {
        let response = await request(app).get('/users');
        //console.log(response);
        expect(response).not.toBeNull();
        done();
    });
})