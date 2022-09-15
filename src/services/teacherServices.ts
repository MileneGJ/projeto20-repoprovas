import * as teacherRepository from '../repositories/teacherRepository'

export async function getTeacherIdFromDB (name:string):Promise<number>{
   const teacher = await teacherRepository.findByName(name)
   if(!teacher){
      throw {status:'NotFound', message:'No teachers were found with this name'}
  }
   return teacher.id
}