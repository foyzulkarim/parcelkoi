// console.log(process.env);

import request from 'supertest';
import app from './app';

beforeAll(async () => {
    console.log('beforeAll...');
});

afterAll(async () => {
    console.log('afterAll...')
});

beforeEach(async () => {
    console.log('beforeEach...');
})

afterEach(async () => {
    console.log('afterEach...');
});

describe('user controller test', () => {

    test('my first test', async () => {
        console.log('hello world');
    });

    test('get users test', async () => {
        let response = await request(app).get('/users');
        expect(response).not.toBeNull();
    });
})