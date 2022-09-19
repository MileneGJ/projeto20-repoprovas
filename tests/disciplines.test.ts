import supertest from "supertest";
import app from "../src/app";
import testFactory from "./factories/tests/testFactory";
import invalidTokenFactory from "./factories/token/invalidTokenFactory";
import tokenFailUserFactory from "./factories/token/tokenFailUserFactory";
import validTokenFactory from "./factories/token/validTokenFactory";

describe('Testing /disciplines/:termId',()=>{

    it('Returns 200 and array of disciplines when token and params are valid',async () =>{
        const token = await validTokenFactory()
        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${token}`).send(test[0])
        const result = await supertest(app)
        .get(`/disciplines/${test[1].termId}`)
        .set('Authorization',`Bearer ${token}`)
        .send()

        expect(result.status).toBe(200)
        expect(result.body).toBeInstanceOf(Array)
        expect(result.body.length).toBeGreaterThan(0)
    })

    it('Returns 401 when token is not valid',async () =>{
        const tokenT = await validTokenFactory()
        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${tokenT}`).send(test[0])

        const tokenF = await invalidTokenFactory()
        const result = await supertest(app)
        .get(`/disciplines/${test[1].termId}`)
        .set('Authorization',`Bearer ${tokenF}`)
        .send()

        expect(result.status).toBe(401)
    })

    it('Returns 404 when user returned by the token is not found',async () =>{
        const tokenT = await validTokenFactory()
        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${tokenT}`).send(test[0])

        const tokenF = await tokenFailUserFactory()
        const result = await supertest(app)
        .get(`/disciplines/${test[1].termId}`)
        .set('Authorization',`Bearer ${tokenF}`)
        .send()

        expect(result.status).toBe(404)
    })

    it('Returns 404 when termId is not found',async () =>{
        const token = await validTokenFactory()
        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization',`Bearer ${token}`).send(test[0])
        const result = await supertest(app)
        .get(`/disciplines/${test[1].termId as number *(-1)}`)
        .set('Authorization',`Bearer ${token}`)
        .send()

        expect(result.status).toBe(404)
    })

})