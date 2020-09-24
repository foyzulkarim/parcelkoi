// console.log(process.env);
import request from 'supertest';
import app from './app';

import { getAllUsers } from "./services/userService";

//jest.mock('winston-daily-rotate-file');
jest.mock('./services/userService');

beforeAll(async () => {

});

afterAll(async () => {

});

beforeEach(async () => {

})

afterEach(async () => {

});

describe('user controller test', () => {

    test('my first test', async () => {
        console.log('hello world');
    });

    test('get users test', async () => {
        let response = await request(app).get('/users');
        expect(response).not.toBeNull();
        console.log('get users test', response.body);
    });

    test('save user test', async () => {
        const obj = { username: 'amazing spiderman' };
        let response = await request(app).post('/users').send(obj);
        expect(response.status).toBe(400);
        const error = response.body;
        expect(error).not.toBeNull();
        expect(error.message).toBe('"username" must only contain alpha-numeric characters');
        expect(error.correlationId).not.toBeNull();
    });
})