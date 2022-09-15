import * as testRepository from '../repositories/testRepository'
import { ITestBody } from '../typeModels/testTypes';
import * as userService from '../services/authServices'
import * as categoryService from '../services/categoryServices'
import * as teacherService from '../services/teacherServices'
import * as disciplineService from '../services/disciplineServices'
import * as teacherDisciplineService from '../services/teacherDisciplineServices'

export async function createTest (test:ITestBody,userId:number) {
    await userService.verifyUserExists(userId)
    await verifyUrlInUse(test.pdfUrl)
    const categoryId = await categoryService.getCategoryIdFromDB(test.category)
    const teacherId = await teacherService.getTeacherIdFromDB(test.teacher)
    const disciplineId = await disciplineService.getDisciplineIdFromDB(test.discipline)
    const teacherDisciplineId = await teacherDisciplineService.getLinkId(teacherId,disciplineId)
    
    await testRepository.insert({
        categoryId,
        teacherDisciplineId,
        name:test.name,
        pdfUrl:test.pdfUrl})
}

async function verifyUrlInUse (pdfUrl:string) {
    const testExists = await testRepository.findByPdfUrl(pdfUrl)
    if(testExists){
        throw {status:'Conflict', message:'This document url was already posted'}
    }
}