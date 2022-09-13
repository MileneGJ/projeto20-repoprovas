import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

export default function schemaValidation (schema:AnySchema) {
    return (req:Request, res:Response, next:NextFunction) =>{
        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error){
            const errorMessage = error.details.map(d=>d.message).join("\n")
            throw {status:'InvalidInput', message:errorMessage}
        }
        next()
    }
}