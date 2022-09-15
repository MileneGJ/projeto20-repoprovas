import prisma from "../database/database";
import { ITermsDB, TTermReturnDB } from "../typeModels/termTypes";

export async function findAll():Promise<TTermReturnDB[]> {
    const terms = await prisma.terms.findMany({
        select:{
            id:true,
            number:true
        }})
    return terms
}

export async function findById (id:number):Promise<ITermsDB> {
    const term = await prisma.terms.findFirst({where:{id}})
    return term as ITermsDB
}