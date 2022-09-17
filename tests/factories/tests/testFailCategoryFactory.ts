import { faker } from "@faker-js/faker";
import prisma from "../../../src/database/database";

export default async function testFailCategoryFactory () {
    const validCategories = ['Projeto','Prática','Recuperação']
    const index = faker.datatype.number({min:0,max:2}) 
    const newCategory = validCategories[index]
    const newDiscipline = faker.lorem.word()
    const newTeacher = faker.name.fullName()
    const newTerm = faker.datatype.number({min:1,max:10})
    const term = await prisma.terms.create({data:{number:newTerm}})
    const discipline = await prisma.disciplines.create({data:{name:newDiscipline, termId:term.id}})
    const teacher = await prisma.teachers.create({data:{name:newTeacher}})
    await prisma.teachersDisciplines.create({data:{teacherId:teacher.id,disciplineId:discipline.id}})
    return {
        name:faker.lorem.word(),
        pdfUrl:faker.internet.url(),
        category:newCategory,
        discipline:newDiscipline,
        teacher:newTeacher
    }
}