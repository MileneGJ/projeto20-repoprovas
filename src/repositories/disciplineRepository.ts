import prisma from "../database/database";
import { IDisciplineDB } from "../typeModels/disciplineTypes";

export async function findByName (name:string):Promise<IDisciplineDB> {
    const discipline = await prisma.disciplines.findFirst({where:{name}})
    return discipline as IDisciplineDB
}