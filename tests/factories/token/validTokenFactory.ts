import supertest from "supertest";
import app from "../../../src/app";
import userFactory from "../user/userFactory";

export default async function validTokenFactory() {
    const user = await userFactory()
    await supertest(app).post('/signup').send(user)
    const modifiedUser = {
        email:user.email,
        password:user.password
    }
    const result =  await supertest(app).post('/signin').send(modifiedUser)
    
    return result.body.token
}