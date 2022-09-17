import prisma from "../database/database";
import { IUserDB, TUserInsertDB } from "../typeModels/userTypes";

export async function insert (user:TUserInsertDB) {
    const newUser = await prisma.users.create({data:{
        email:user.email,
        password:user.password as string
    }})
    return newUser.id
}

export async function findByEmail (email:string):Promise<IUserDB> {
    const user = await prisma.users.findFirst({where:{email}})
    return user as IUserDB
}

export async function findById (id:number):Promise<IUserDB> {
    const user = await prisma.users.findFirst({where:{id}})
    return user as IUserDB
}