import supertest from "supertest";
import app from "../src/app";
import invalidTokenFactory from "./factories/token/invalidTokenFactory";
import testFactory from "./factories/tests/testFactory";
import testFailAssociationFactory from "./factories/tests/testFailAssociationFactory";
import testFailCategoryFactory from "./factories/tests/testFailCategoryFactory";
import testFailDisciplineFactory from "./factories/tests/testFailDisciplineFactory";
import testFailTeacherFactory from "./factories/tests/testFailTeacherFactory";
import tokenFailUserFactory from "./factories/token/tokenFailUserFactory";
import validTokenFactory from "./factories/token/validTokenFactory";
import userFactory from "./factories/user/userFactory";

describe('Testing POST /tests', () => {

    it('Returns 201 when registering a new test with correct format', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])

        expect(result.status).toBe(201)
    })

    it('Returns 409 when test url was already registered', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])

        expect(result.status).toBe(409)
    })

    it('Returns 401 when token is not valid', async () => {
        const token = await invalidTokenFactory()
        const test = await testFactory()
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])

        expect(result.status).toBe(401)
    })

    it('Returns 404 when user returned by the token is not found', async () => {
        const user = await userFactory()
        const createdUser = await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token
        await tokenFailUserFactory(createdUser.body.id)
        
        const test = await testFactory()
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])

        expect(result.status).toBe(404)
    })

    it('Returns 404 when teacher name is not found', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFailTeacherFactory()
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test)

        expect(result.status).toBe(404)
    })

    it('Returns 404 when discipline name is not found', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFailDisciplineFactory()
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test)

        expect(result.status).toBe(404)
    })

    // it('Returns 404 when category name is not found', async () => {
    //     const token = await validTokenFactory()
    //     const test = await testFailCategoryFactory()
    //     const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test)

    //     expect(result.status).toBe(404)
    // })

    it('Returns 409 when teacher is not associated with discipline', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFailAssociationFactory()
        const result = await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test)

        expect(result.status).toBe(409)
    })

})

describe('Testing GET /tests/:termId/:disciplineId', () => {

    it('Returns 200 and array of tests when params and token are valid', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[1].termId}/${test[2].disciplineId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(200)
        expect(result.body).toBeInstanceOf(Array)
        expect(result.body.length).toBeGreaterThan(0)
    })

    it('Returns 401 when token is not valid', async () => {
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
        await supertest(app).post('/tests').set('Authorization', `Bearer ${tokenT}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[1].termId}/${test[2].disciplineId}`)
            .set('Authorization', `Bearer ${tokenF}`)
            .send()

        expect(result.status).toBe(401)
    })

    it('Returns 404 when user returned by the token is not found', async () => {
        const user = await userFactory()
        const createdUser = await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        
        await tokenFailUserFactory(createdUser.body.id)

        const result = await supertest(app)
            .get(`/tests/${test[1].termId}/${test[2].disciplineId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(404)
    })

    it('Returns 404 when termId is not found', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[1].termId as number * (-1)}/${test[2].disciplineId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(404)
    })

    it('Returns 404 when disciplineId is not found', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[1].termId}/${test[2].disciplineId as number * (-1)}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(404)
    })

})

describe('Testing GET /tests/:teacherId', () => {

    it('Returns 200 and array of tests when params and token are valid', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[3].teacherId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(200)
        expect(result.body).toBeInstanceOf(Array)
        expect(result.body.length).toBeGreaterThan(0)
    })

    it('Returns 401 when token is not valid', async () => {
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
        await supertest(app).post('/tests').set('Authorization', `Bearer ${tokenT}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[3].teacherId}`)
            .set('Authorization', `Bearer ${tokenF}`)
            .send()

        expect(result.status).toBe(401)
    })

    it('Returns 404 when user returned by the token is not found', async () => {
        const user = await userFactory()
        const createdUser = await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])

        await tokenFailUserFactory(createdUser.body.id)

        const result = await supertest(app)
            .get(`/tests/${test[3].teacherId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(404)
    })

    it('Returns 404 when teacherId is not found', async () => {
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email: user.email,
            password: user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token

        const test = await testFactory()
        await supertest(app).post('/tests').set('Authorization', `Bearer ${token}`).send(test[0])
        const result = await supertest(app)
            .get(`/tests/${test[3].teacherId as number * (-1)}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(result.status).toBe(404)
    })

})