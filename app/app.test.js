import request from 'supertest';
import app from './app';

beforeAll(async () => {
    console.log('before all');
});

afterAll(async () => {
    console.log('after all');
});

beforeEach(async () => {
    console.log('before each');
});

afterEach(async () => {
    console.log('after each');
})


describe('user controller test suite', () => {
    test('should work', async () => {
        console.log('my first test');
    })

    test('get all users should return list of users', async () => {
        console.log('get all users test');
        let response = await request(app).get('/users');
        expect(response.body).not.toBeNull();
        console.log(response.body);
    })
})

