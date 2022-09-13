import * as userRepository from '../repositories/userRepository'
import { TUserBody } from '../typeModels/userTypes'

export async function createUser (user:TUserBody) {
    await userRepository.insert(user)
}