import * as teacherRepository from '../repositories/teacherRepository'
import * as userService from '../services/authServices'

export async function getTeacherIdFromName (name:string):Promise<number>{
   const teacher = await teacherRepository.findByName(name)
   if(!teacher){
      throw {status:'NotFound', message:'No teachers were found with this name'}
  }
   return teacher.id
}

export async function getAll (userId:number) {
   await userService.verifyUserExists(userId)
   const teachers = await teacherRepository.findAll()
   return teachers
}

export async function verifyTeacherExists (id:number) {
   const teacher = await teacherRepository.findById(id)
   if(!teacher) {
      throw {status:'NotFound', message:'No teachers were found with given id'}
   }
}