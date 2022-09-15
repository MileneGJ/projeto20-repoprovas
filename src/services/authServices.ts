import * as userRepository from '../repositories/userRepository'
import { IUserBody, IUserDB } from '../typeModels/userTypes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function createUser (user:IUserBody) {
    const {email,password:rawPassword,confirmPassword} = user
    await verifyEmailInUse(user.email)
    const password = await treatPassword(rawPassword,confirmPassword as string)
    await userRepository.insert({email,password})
}

async function verifyEmailInUse (email:string) {
    const user = await userRepository.findByEmail(email)
    if(user) {
        throw {status:'Conflict', message:"Email already in use"}
    }
}

async function treatPassword(password:string,confirmation:string):Promise<string>{
    if(password!==confirmation){
        throw {status:"InvalidInput", message:"Password diverges from its confirmation"}
    }
    return await encryptPassword(password)
}

async function encryptPassword(password:string){
    const saltRound = Number(process.env.BCRYPT_SALT) || 15
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password,salt)
}

export async function loginUser (user:IUserBody):Promise<string> {
    const foundUser = await verifyEmailAndPassword(user)
    return generateToken(foundUser.id)
}

async function verifyEmailAndPassword (user:IUserBody):Promise<IUserDB> {
    const foundUser = await userRepository.findByEmail(user.email)
    const encPassword = foundUser?.password as string || ""
    const passwordMatch = await bcrypt.compare(user.password,encPassword)
    if(!foundUser||!passwordMatch) {
        throw {status:'Unauthorized', message:"Incorrect email or password"}
    }
    return foundUser as IUserDB
}

function generateToken(payload:number) {
    const SECRET = process.env.JWT_SECRET || "secret"
    const token = jwt.sign({payload},SECRET,{
        expiresIn:'12h'
    })
    return token
}

export async function verifyUserExists (id:number) {
    const user = await userRepository.findById(id)
    if(!user){
        throw {status:'NotFound', message:'No users were found with given id'}
    }
}