import supertest from 'supertest';
import app from "../app.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import cookie from "cookie";

let tokens = {
    access_token: null,
    refresh_token: null,
}

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log("CONNECTED!")
  });

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    console.log("DISCONNECTED!")
    });

describe('POST /signup', () => {
    
    describe('given valid fields', () => {
        it('should return a 201 and new object', async () => {
            const { body, statusCode, type } = await supertest(app)
                                .post('/api/auth/signup')
                                .send({
                                    email:"helloworld@gmail.com",
                                    password: "hello1234",
                                    firstName: "John",
                                    lastName: "Doe"
                                })
            expect(statusCode).toBe(201);
            expect(type).toBe('application/json');
            expect(body.hasOwnProperty('_id')).toBe(true);
        })  
    })

    describe('given email already in use', () => {
        it('should return a 400 and an error message', async () => {
            const { body, statusCode, type } = await supertest(app)
                                .post('/api/auth/signup')
                                .send({
                                    email:"helloworld@gmail.com",
                                    password: "hello1234",
                                    firstName: "John",
                                    lastName: "Doe"
                                })
            expect(statusCode).toBe(400);
            expect(type).toBe('application/json');
            expect(body.hasOwnProperty('msg')).toBe(true);
        })
    })
    
    describe('given missing fields', () => {
        it('should return a 400', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({
                    email:"helloworld@gmail.com",
                    password: "hello1234"
                })
                .expect(400);
        })  
    })

})

describe('POST /login', () => {
    
    describe('given a valid username and password', () => {
        it('should return a 200 and a user object', async () => {
            const { body, statusCode, type, headers } = await supertest(app)
                                                .post('/api/auth/login')
                                                .send({
                                                    email: "helloworld@gmail.com",
                                                    password: "hello1234"
                                                });
            expect(body.hasOwnProperty("user")).toBe(true);
            expect(headers !== undefined).toBe(true);
            expect(statusCode).toBe(200);
            expect(type).toBe('application/json');
            // Test cookies
            tokens.access_token = cookie.parse(headers['set-cookie'][0])['accessToken'];
            tokens.refresh_token = cookie.parse(headers['set-cookie'][1])['refreshToken'];
        })
    })

    describe('given a invalid username or password', () => {
        it('should return a 400 and a msg', async () => {
            const { body, statusCode, type } = await supertest(app)
                                                .post('/api/auth/login')
                                                .send({
                                                    email: "goodbyeworld@gmail.com",
                                                    password: "bye1234"
                                                });
            expect(body.hasOwnProperty("msg")).toBe(true);
            expect(statusCode).toBe(400);
            expect(type).toBe('application/json');
        })
    })

})


