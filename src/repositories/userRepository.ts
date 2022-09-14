import prisma from "../database/database";
import { TUserInsertDB } from "../typeModels/userTypes";

export async function insert (user:TUserInsertDB) {
    await prisma.users.create({data:{...user}})
}

export async function findByEmail (email:string) {
    const user = await prisma.users.findFirst({where:{email}})
    return user
}