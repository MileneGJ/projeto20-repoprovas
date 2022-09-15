import { Request, Response } from "express";
import * as termService from '../services/termServices'

export async function getAllTerms (req:Request,res:Response) {
    const {userId} = res.locals
    const terms = await termService.getAll(userId)
    res.status(200).send(terms)
}