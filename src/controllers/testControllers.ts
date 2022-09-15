import { Request, Response } from "express";
import * as testService from '../services/testServices'

export async function createTests (req:Request, res: Response) {
    const {userId} = res.locals
    await testService.createTest(req.body,userId)
    res.sendStatus(201)
}