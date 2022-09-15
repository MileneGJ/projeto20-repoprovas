import * as disciplineRepository from '../repositories/disciplineRepository'

export async function getDisciplineIdFromDB (name:string):Promise<number> {
    const discipline = await disciplineRepository.findByName(name)
    if(!discipline){
        throw {status:'NotFound', message:'No disciplines were found with this name'}
    }
    return discipline.id
}