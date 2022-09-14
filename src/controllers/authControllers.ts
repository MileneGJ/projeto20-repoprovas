import { Request, Response } from "express";
import * as authService from '../services/authServices'

export async function createUser (req:Request, res:Response) {
    await authService.createUser(req.body)
    res.sendStatus(201)
}

export async function authenticateUser (req:Request, res:Response) {
    const token = await authService.loginUser(req.body)
    res.status(200).send(token)
}