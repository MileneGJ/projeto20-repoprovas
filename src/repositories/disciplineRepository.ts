import prisma from "../database/database";
import { IDisciplineDB, TDisciplineReturnDB } from "../typeModels/disciplineTypes";

export async function findByName (name:string):Promise<IDisciplineDB> {
    const discipline = await prisma.disciplines.findFirst({where:{name}})
    return discipline as IDisciplineDB
}

export async function findByTermId (termId:number):Promise<TDisciplineReturnDB[]> {
    const disciplines = await prisma.disciplines.findMany({
        where:{termId},
        select:{
            id:true,
            name:true
        }
    })
    return disciplines
}

export async function findById (id:number):Promise<IDisciplineDB>{
    const discipline = await prisma.disciplines.findUnique({where:{id}})
    return discipline as IDisciplineDB
}