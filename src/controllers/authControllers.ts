import { Request, Response } from "express";
import * as authService from '../services/authServices'

export async function createUser (req:Request, res:Response) {
    await authService.createUser(req.body)
    res.sendStatus(201)
}