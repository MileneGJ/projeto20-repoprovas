import { Request,Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IUserToken } from '../typeModels/userTypes'

export default function tokenVerification (req:Request, res:Response, next:NextFunction) {
    const {authorization} = req.headers
    if(!authorization) throw {status:'Unauthorized', message:'Missing authorization header'}
    const token = authorization.replace('Bearer ','')
    if(!token) throw {status: 'Unauthorized', message:'Missing token'}
    const SECRET = process.env.JWT_SECRET
    const id = jwt.verify(token as string,SECRET as string,jwtHandler as any)
    res.locals.userId = id
    next()
}

function jwtHandler (error:string|undefined, decoded:IUserToken|undefined):number {
    if (error) throw {code:'Unauthorized',message:"Invalid token"};
    const success =  decoded as IUserToken
    return success.id;
}