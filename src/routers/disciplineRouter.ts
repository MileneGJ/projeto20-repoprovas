import { Router } from "express";
import * as disciplineController from '../controllers/disciplineControllers'
import tokenVerification from "../middlewares/tokenVerification";

const disciplineRouter = Router()

disciplineRouter.get('/disciplines/:termId',tokenVerification,disciplineController.getDisciplinesByTerm)

export default disciplineRouter