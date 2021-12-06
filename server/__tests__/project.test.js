import supertest from 'supertest';
import app from "../app.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { getworkingaccesstoken, getworkingrefreshtoken, project, getprojectid, setprojectid } from "./common_data.js";

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe('POST /create', () => {
    describe('given a user is logged in and provides valid fields', () => {
        
        it('should return 201 and object back', async () => {
            const { statusCode, body } = await supertest(app)
                                                .post('/api/projects/create')
                                                .set('Cookie', [getworkingaccesstoken(), getworkingrefreshtoken()])
                                                .send(project)
                                                
            expect(body).toHaveProperty('_id');
            expect(statusCode).toBe(201);
            // Saving project id for future tests
            setprojectid(body._id);

        })

    })

    describe('...provides invalid fields', () => {
        
        it('should return 400', async () => {
            const { statusCode } = await supertest(app)
                                                .post('/api/projects/create')
                                                .set('Cookie', [getworkingaccesstoken(), getworkingrefreshtoken()])
                                                .send({})    
            expect(statusCode).toBe(400);    
        })

    })
})

describe('GET /all', () => {
    describe('when "get"ing all post,', () => {
        it('should return all posts in an array with objects inside', async () => {
            const { statusCode, body } = await supertest(app).get('/api/projects/all')
            expect(body).toHaveProperty("all_projects");
            expect(statusCode).toBe(200);
        })
    })
})

describe('GET /:project_id', () => {

    describe('given a valid project id', () => {
        it('should return the project and 200 code', async ()=>{
            const { statusCode, body } = await supertest(app)
                                            .get(`/api/projects/${getprojectid()}`)
            expect(statusCode).toBe(200);
            expect(body._id).toBe(getprojectid());
        })
    })

    describe('given an invalid project id', () => {
        it('should return the 400 code', async ()=>{
            const { statusCode, body } = await supertest(app)
                                            .get(`/api/projects/invalidid`)
            expect(statusCode).toBe(400);
        })
    })
})
