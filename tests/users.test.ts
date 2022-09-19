import supertest from "supertest";
import app from "../src/app";
import userFactory from "./factories/user/userFactory";

describe('Testing POST /signup',()=>{

    it('Returns 201 when posting a new user with correct format',async()=>{
        const body=await userFactory()
        const result = await supertest(app).post('/signup').send(body)
        expect(result.status).toBe(201)
    })

    it('Returns 409 when posting an existing user',async()=>{
        const body=await userFactory()
        await supertest(app).post('/signup').send(body)
        const result = await supertest(app).post('/signup').send(body)
        expect(result.status).toBe(409)
    })

    it('Returns 422 when password confirmation is not sent',async()=>{
        const body=await userFactory()
        const modifiedBody = {
            email:body.email,
            password:body.password
        }
        const result = await supertest(app).post('/signup').send(modifiedBody)
        expect(result.status).toBe(422)
    })

})

describe('Testing POST /signin', ()=>{

    it('Returns 200 and token when logging in with a created user',async()=>{
        const body=await userFactory()
        await supertest(app).post('/signup').send(body)
        const modifiedBody = {
            email:body.email,
            password:body.password
        }
        const result = await supertest(app).post('/signin').send(modifiedBody)
        
        expect(result.status).toBe(200)
        expect(typeof(result.body.token)).toEqual('string')
        expect(result.body.token.length).toBeGreaterThan(0)
    })

    it('Returns 401 when logging in with unregistered user',async ()=>{
        const body=await userFactory()
        const modifiedBody = {
            email:body.email,
            password:body.password
        }
        const result = await supertest(app).post('/signin').send(modifiedBody)
        expect(result.status).toBe(401)
    })

    it('Returns 401 when logging in with incorrect password',async ()=>{
        const body=await userFactory()
        await supertest(app).post('/signup').send(body)
        const modifiedBody = {
            email:body.email,
            password:body.password + "x"
        }
        const result = await supertest(app).post('/signin').send(modifiedBody)
        expect(result.status).toBe(401)
    })

})