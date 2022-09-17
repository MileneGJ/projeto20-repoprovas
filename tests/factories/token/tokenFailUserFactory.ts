import supertest from "supertest";
import app from "../../../src/app";
import prisma from "../../../src/database/database";
import userFactory from "../user/userFactory";

export default async function tokenFailUserFactory() {
    const user = await userFactory()
        const createdUser = await supertest(app).post('/signup').send(user)
        const modifiedUser = {
            email:user.email,
            password:user.password
        }
        const returnUser = await supertest(app).post('/signin').send(modifiedUser)
        const token = returnUser.body.token
    await prisma.users.delete({where:{id:createdUser.body.id}})
    return token

}