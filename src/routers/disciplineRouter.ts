import { Router } from "express";
import * as disciplineController from '../controllers/disciplineControllers'
import tokenVerification from "../middlewares/tokenVerification";

const disciplineRouter = Router()
disciplineRouter.use(tokenVerification)

disciplineRouter.get('/disciplines/:termId',disciplineController.getDisciplinesByTerm)

export default disciplineRouter