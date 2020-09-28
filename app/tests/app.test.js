import request from "supertest";
import app from "../src/app";

jest.mock('../src/services/userService');

describe('app test suite', () => {
    test('my firt test', async () => {
        console.log('my firt test');
    })

    test('app firt test', async () => {
        console.log('my firt test');
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.length).toBe(1);
    })
})