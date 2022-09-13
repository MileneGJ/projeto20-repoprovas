import prisma from "../database/database";
import { TUserBody } from "../typeModels/userTypes";

export async function insert (user:TUserBody) {
    await prisma.users.create({data:{...user}})
}