import { faker } from "@faker-js/faker";
import prisma from "../../../src/database/database";

export default async function testFailAssociationFactory () {
    const validCategories = ['Projeto','Prática','Recuperação']
    const categoryIndex = faker.datatype.number({min:0,max:2}) 
    const newCategory = validCategories[categoryIndex]

    const teachers = await prisma.teachers.findMany()
    const teacherIndex = faker.datatype.number({min:0,max:(teachers.length-1)}) 
    const teacherId = teachers[teacherIndex].id
    
    const disciplines = await prisma.disciplines.findMany()
    const disciplineIds = disciplines.map(d=>{return d.id})
    
    const rawDisciplinesNOTConsidered = await prisma.teachersDisciplines.findMany({where:{teacherId},select:{disciplineId:true}})
    
    const disciplinesNOTConsidered = rawDisciplinesNOTConsidered.map(d=>{return d.disciplineId})
    
    const disciplinesTOBEConsidered = disciplines.filter((x,index)=>
        !disciplinesNOTConsidered.includes(disciplineIds[index]))
        
    const disciplineIndex = faker.datatype.number({min:0,max:(disciplinesTOBEConsidered.length-1)}) 

    return {
        name:faker.lorem.word(),
        pdfUrl:faker.internet.url(),
        category:newCategory,
        discipline:disciplinesTOBEConsidered[disciplineIndex].name,
        teacher:teachers[teacherIndex].name
    }
}