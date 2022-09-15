import * as categoryRepository from '../repositories/categoryRepository'


export async function getCategoryIdFromName (name:string):Promise<number> {
    const category = await categoryRepository.findByName(name)
    if(!category){
        throw {status:'NotFound', message:'No categories were found with this name'}
    }
    return category.id
}