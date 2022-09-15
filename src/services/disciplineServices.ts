import * as disciplineRepository from '../repositories/disciplineRepository'
import * as userService from '../services/authServices'
import * as termService from '../services/termServices'
import { IDisciplineDB, TDisciplineReturnDB } from '../typeModels/disciplineTypes'

export async function getDisciplineIdFromName (name:string):Promise<number> {
    const discipline = await disciplineRepository.findByName(name)
    if(!discipline){
        throw {status:'NotFound', message:'No disciplines were found with this name'}
    }
    return discipline.id
}

export async function getAllFromTermId (userId:number, termId:number):Promise<TDisciplineReturnDB[]> {
    await userService.verifyUserExists(userId)
    await termService.verifyTermExists(termId)
    const disciplines = await disciplineRepository.findByTermId(termId)
    return disciplines
}

export async function verifyDisciplineExists (id:number) {
    const discipline = await disciplineRepository.findById(id)
    if(!discipline){
        throw {status:'NotFound', message:'No disciplines were found with given id'}
    }
}