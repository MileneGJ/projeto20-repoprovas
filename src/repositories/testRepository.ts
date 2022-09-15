import prisma from "../database/database";
import { TTestInsertDB, ITestDB, ITestReturnDB } from "../typeModels/testTypes";

export async function insert (test:TTestInsertDB) {
    await prisma.tests.create({data:test})
}

export async function findByPdfUrl (pdfUrl:string):Promise<ITestDB> {
    const test = await prisma.tests.findFirst({where:{pdfUrl}})
    return test as ITestDB
}

export async function findByDisciplineId (termId:number,disciplineId:number):Promise<ITestReturnDB[]> {
    const tests = await prisma.tests.findMany({
        where:{
            teachersDisciplines:{
                is:{disciplineId,
                    disciplines:{
                        is:{termId}
                    }
                }
            }
        },
        select:{
            name:true,
            pdfUrl:true,
            teachersDisciplines:{
                select:{
                    teachers:{
                        select:{name:true}
                    }
                }
            },
            categories:{
                select:{
                    name:true
                }
            }
        },
        orderBy:{
            categories:{
                name:'asc'
            }
        }
    })
    return tests
}