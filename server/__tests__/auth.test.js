import supertest from 'supertest';
import app from "../app.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { setaccesstoken, setrefreshtoken, getaccesstoken, getrefreshtoken, user1 } from "./common_data.js"

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe('POST /signup', () => {
    
    describe('given valid fields', () => {
        it('should return a 201 and new object', async () => {
            const { body, statusCode, type } = await supertest(app)
                                .post('/api/auth/signup')
                                .send(user1)
            expect(statusCode).toBe(201);
            expect(type).toBe('application/json');
            expect(body).toHaveProperty('user');
        })  
    })

    describe('given email already in use', () => {
        it('should return a 400 and an error message', async () => {
            const { body, statusCode, type } = await supertest(app)
                                .post('/api/auth/signup')
                                .send(user1)
            expect(statusCode).toBe(400);
            expect(type).toBe('application/json');
            expect(body).toHaveProperty('msg');
        })
    })
    
    describe('given missing fields', () => {
        it('should return a 400', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({
                    email: user1.email,
                    password: user1.password
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
                                                    email: user1.email,
                                                    password: user1.password
                                                });
            expect(body).toHaveProperty('user');
            expect(headers).toBeTruthy();
            expect(statusCode).toBe(200);
            expect(type).toBe('application/json');
            // Test cookies
            setaccesstoken(headers['set-cookie'][0].split(';')[0]);
            setrefreshtoken(headers['set-cookie'][1].split(';')[0]);
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
            expect(body).toHaveProperty('msg');
            expect(statusCode).toBe(400);
            expect(type).toBe('application/json');
        })
    })
})

describe('POST /isAuth', () => {
    
    describe('given valid tokens', () => {
        it('should return a 200 statuscode ', async ()=>{
            const { statusCode } = await supertest(app)
                        .get('/api/auth/isAuth')
                        .set('Cookie', [getaccesstoken(), getrefreshtoken()]) 
            expect(statusCode).toBe(200);    
        });
    })

    describe('given a missing accessToken', () => {
        it('should return send a new accesstoken and 200 statuscode', async () => {
            const { statusCode } = await supertest(app)
                                                .get('/api/auth/isAuth')
                                                .set('Cookie', [getrefreshtoken()])
            expect(statusCode).toBe(200);
        })
    })

    describe('given no tokens', () => {
        it('should return code 401 and msg', async () => {
            const { statusCode, body } = await supertest(app).get('/api/auth/isAuth')
            expect(statusCode).toBe(401);
            expect(body).toHaveProperty('msg');
        })
    })

})

describe('POST /logout', () => {
    
    describe('given valid tokens', () => {
        it('should return code 200', async () => {
            const { statusCode } = await supertest(app)
                                                .post('/api/auth/logout')
                                                .set('Cookie', [getaccesstoken(), getrefreshtoken()])
            expect(statusCode).toBe(200);
        })
    })
    
    describe('given invalid tokens', () => {
        it('should return code 401', async () => {
            const { statusCode } = await supertest(app)
                                                .post('/api/auth/logout')
            expect(statusCode).toBe(401);
        })
    })
})