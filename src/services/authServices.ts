import * as userRepository from '../repositories/userRepository'
import { IUserBody } from '../typeModels/userTypes'

export async function createUser (user:IUserBody) {
    const {email,password,confirmPassword} = user
    await verifyEmailInUse(user.email)
    verifyPasswordConfirmation(password,confirmPassword)
    await userRepository.insert({email,password})
}

async function verifyEmailInUse (email:string) {
    const user = await userRepository.findByEmail(email)
    if(user) {
        throw {status:'Conflict', message:"Email already in use"}
    }
}

function verifyPasswordConfirmation(password:string,confirmation:string){
    if(password!==confirmation){
        throw {status:"InvalidInput", message:"Password diverges from its confirmation"}
    }
}
