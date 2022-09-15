import { Request, Response } from "express";
import * as disciplineService from '../services/disciplineServices'

export async function getDisciplinesByTerm (req: Request, res: Response) {
    const {userId} = res.locals;
    const {termId} = req.params;
    const disciplines = await disciplineService.getAllFromTermId(userId,Number(termId))
    res.status(200).send(disciplines)
}