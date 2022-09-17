import { faker } from "@faker-js/faker";
import prisma from "../../../src/database/database";

export default async function testFailTeacherFactory () {
    const validCategories = ['Projeto','Prática','Recuperação']
    const categoryIndex = faker.datatype.number({min:0,max:2}) 
    const newCategory = validCategories[categoryIndex]

    const newDiscipline = faker.lorem.word()
    const teachers = await prisma.teachers.findMany()
    const teacherIndex = faker.datatype.number({min:0,max:(teachers.length-1)}) 

    return {
        name:faker.lorem.word(),
        pdfUrl:faker.internet.url(),
        category:newCategory,
        discipline:newDiscipline,
        teacher:teachers[teacherIndex].name
    }
}