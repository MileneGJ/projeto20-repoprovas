import prisma from "../database/database";
import { ITeacherDisciplineDB } from "../typeModels/teacherDisciplineTypes";

export async function findByTeacherAndDisciplineIds(teacherId: number, disciplineId: number): Promise<ITeacherDisciplineDB> {
    const link = await prisma.teachersDisciplines.findFirst({
        where: {
            AND: [
                { teacherId },
                { disciplineId }
            ]
        }
    })
    return link as ITeacherDisciplineDB
}