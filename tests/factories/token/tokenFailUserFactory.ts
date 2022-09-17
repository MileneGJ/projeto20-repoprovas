import supertest from "supertest";
import app from "../../../src/app";
import prisma from "../../../src/database/database";
import userFactory from "../user/userFactory";

export default async function tokenFailUserFactory(id:number) {
    await prisma.users.delete({where:{id}})

}