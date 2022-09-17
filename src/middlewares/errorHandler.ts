import { Request, Response, NextFunction } from "express";
import { CustomError } from "../typeModels/generalTypes";

export default function errorHandler(error: CustomError, req: Request, res: Response, next: NextFunction) {
    console.log(error.message)
    switch (error.status) {
        case 'InvalidInput':
            return res.status(422).send(error.message)
        case 'Unauthorized':
            return res.status(401).send(error.message)
        case 'Conflict':
            return res.status(409).send(error.message)
        case 'NotFound':
            return res.status(404).send(error.message)
        default:
            
            return res.status(500).send('Server encountered an error')
    }
}