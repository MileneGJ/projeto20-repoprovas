import prisma from "../database/database";
import { ICategoryDB } from "../typeModels/categoryTypes";

export async function findByName(name:string):Promise<ICategoryDB> {
    const category = await prisma.categories.findFirst({where:{name}})
    return category as ICategoryDB
}