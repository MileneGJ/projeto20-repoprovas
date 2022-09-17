import { faker } from "@faker-js/faker";
import prisma from "../../../src/database/database";

export default async function testFailDisciplineFactory () {
    const validCategories = ['Projeto','Prática','Recuperação']
    const categoryIndex = faker.datatype.number({min:0,max:2}) 
    const newCategory = validCategories[categoryIndex]

    const newTeacher = faker.name.fullName()
    const disciplines = await prisma.disciplines.findMany()
    const disciplineIndex = faker.datatype.number({min:0,max:(disciplines.length-1)}) 
    
    return {
        name:faker.lorem.word(),
        pdfUrl:faker.internet.url(),
        category:newCategory,
        discipline:disciplines[disciplineIndex].name,
        teacher:newTeacher
    }
}