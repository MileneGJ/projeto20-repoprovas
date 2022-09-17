import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'

export async function getLinkId (teacherId:number, disciplineId:number):Promise<number> {
    const link = await teacherDisciplineRepository.findByTeacherAndDisciplineIds(teacherId,disciplineId)
    if(!link){
        throw {status:'Conflict', message:'Teacher is not associated with the discipline provided'}
    }
    return link.id
} 