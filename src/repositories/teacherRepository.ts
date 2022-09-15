import prisma from "../database/database";
import { ITeacherDB, TTeacherReturnDB } from "../typeModels/teacherTypes";

export async function findByName (name:string):Promise<ITeacherDB> {
    const teacher = await prisma.teachers.findFirst({where:{name}})
    return teacher as ITeacherDB
}

export async function findAll (): Promise<TTeacherReturnDB[]> {
    const teachers = await prisma.teachers.findMany({
        select:{
            id:true,
            name:true
        }
    })
    return teachers
}

export async function findById (id:number):Promise<ITeacherDB> {
    const teacher = await prisma.teachers.findUnique({where:{id}})
    return teacher as ITeacherDB
}