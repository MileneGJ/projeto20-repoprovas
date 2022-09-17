import { faker } from "@faker-js/faker";
import prisma from "../../../src/database/database";

export default async function testFailCategoryFactory () {
    const validCategories = ['Projeto','Prática','Recuperação']
    const categoryIndex = faker.datatype.number({min:0,max:2}) 
    const newCategory = validCategories[categoryIndex]
    const teachersDisciplines = await prisma.teachersDisciplines.findMany()
    const teacherDisciplineIndex = faker.datatype.number({min:0,max:(teachersDisciplines.length-1)}) 
    const teacherId = teachersDisciplines[teacherDisciplineIndex].teacherId
    const disciplineId = teachersDisciplines[teacherDisciplineIndex].disciplineId

    const newTeacher = await prisma.teachers.findUnique({where:{id:teacherId}})
    const newDiscipline = await prisma.disciplines.findUnique({where:{id:disciplineId}})

    await prisma.categories.delete({where:{name:newCategory}})

    return {
        name:faker.lorem.word(),
        pdfUrl:faker.internet.url(),
        category:newCategory,
        discipline:newDiscipline?.name,
        teacher:newTeacher?.name
    }
}