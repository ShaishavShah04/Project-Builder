import supertest from 'supertest';
import app from "../app.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";


describe('POST /signup', () => {
    
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
      });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

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