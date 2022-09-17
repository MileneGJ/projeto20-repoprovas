import supertest from "supertest";
import app from "../src/app";
import testFactory from "./factories/tests/testFactory";
import invalidTokenFactory from "./factories/token/invalidTokenFactory";
import tokenFailUserFactory from "./factories/token/tokenFailUserFactory";
import validTokenFactory from "./factories/token/validTokenFactory";
import userFactory from "./factories/user/userFactory";

describe('Testing GET /terms',()=>{

    it('Returns 200 and array of terms when token is valid',async()=>{
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${token}`).send(test[0])
        const result = await supertest(app)
        .get(`/terms`)
        .set('Authorization',`Bearer ${token}`)
        .send()

        expect(result.status).toBe(200)
        expect(result.body).toBeInstanceOf(Array)
        expect(result.body.length).toBeGreaterThan(0)
    })

    it('Returns 401 when token is not valid',async()=>{
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const tokenT = returnUser.body.token

        const tokenF = await invalidTokenFactory()

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${tokenT}`).send(test[0])
        const result = await supertest(app)
        .get(`/terms`)
        .set('Authorization',`Bearer ${tokenF}`)
        .send()

        expect(result.status).toBe(401)
    })

    it('Returns 404 when user returned by the token is not found',async()=>{
        const user = await userFactory()
        const createdUser = await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${token}`).send(test[0])
        
        await tokenFailUserFactory(createdUser.body.id)
        
        const result = await supertest(app)
        .get(`/terms`)
        .set('Authorization',`Bearer ${token}`)
        .send()

        expect(result.status).toBe(404)
    })
})