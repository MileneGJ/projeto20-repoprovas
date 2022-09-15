import { Request, Response } from "express";
import * as testService from '../services/testServices'

export async function createTests (req:Request, res: Response) {
    const {userId} = res.locals
    await testService.createTest(req.body,userId)
    res.sendStatus(201)
}

export async function getAllFromTermAndDisciplineId (req:Request, res:Response) {
    const {userId} = res.locals
    const {disciplineId} = req.params
    const {termId} = req.params
    const tests = await testService.findByTermAndDisciplineId(userId,Number(termId),Number(disciplineId))
    res.status(200).send(tests)
}

export async function getAllFromTeacherId (req:Request, res:Response) {
    const {userId} = res.locals
    const {teacherId} = req.params
    const tests = await testService.findByTeacherId(userId,Number(teacherId))
    res.status(200).send(tests)
}