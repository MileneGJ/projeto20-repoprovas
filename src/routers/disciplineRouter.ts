import { Router } from "express";
import * as disciplineController from '../controllers/disciplineControllers'

const disciplineRouter = Router()

disciplineRouter.get('/disciplines/:termId',disciplineController.getDisciplinesByTerm)

export default disciplineRouter