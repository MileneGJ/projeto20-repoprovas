import * as termRepository from '../repositories/termRepository'
import * as userService from '../services/authServices'
import { ITermsDB, TTermReturnDB } from '../typeModels/termTypes'

export async function getAll(userId:number):Promise<TTermReturnDB[]> {
    await userService.verifyUserExists(userId)
    const terms = await termRepository.findAll()
    return terms
}

export async function verifyTermExists (id:number) {
    const term = await termRepository.findById(id)
    if(!term){
        throw {status:'NotFound', message:'No terms were found with given id'}
    }
}

