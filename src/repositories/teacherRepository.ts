import prisma from "../database/database";
import { ITeacherDB } from "../typeModels/teacherTypes";

export async function findByName (name:string):Promise<ITeacherDB> {
    const teacher = await prisma.teachers.findFirst({where:{name}})
    return teacher as ITeacherDB
}