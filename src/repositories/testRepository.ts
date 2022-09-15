import prisma from "../database/database";
import { TTestInsertDB, ITestDB } from "../typeModels/testTypes";

export async function insert (test:TTestInsertDB) {
    await prisma.tests.create({data:test})
}

export async function findByPdfUrl (pdfUrl:string):Promise<ITestDB> {
    const test = await prisma.tests.findFirst({where:{pdfUrl}})
    return test as ITestDB
}