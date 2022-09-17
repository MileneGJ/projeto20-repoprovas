import { Request, Response } from "express";
import * as authService from '../services/authServices'

export async function createUser (req:Request, res:Response) {
    const id = await authService.createUser(req.body)
    res.status(201).send({id})
}

export async function authenticateUser (req:Request, res:Response) {
    const token = await authService.loginUser(req.body)
    res.status(200).send({token})
}