import { Request, Response } from "express";
import * as teacherService from '../services/teacherServices'

export async function getAllTeachers (req:Request, res:Response) {
    const {userId} = res.locals
    const teachers = await teacherService.getAll(userId)
    res.status(200).send(teachers)
}